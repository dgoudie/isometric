import {
  FinishedWorkoutExerciseWithSets,
  FinishedWorkoutWithExerciseWithSets,
  FullWorkout,
} from '../../example_type';
import {
  differenceInMilliseconds,
  millisecondsToSeconds,
  minutesToMilliseconds,
} from 'date-fns';

import { getExerciseById } from './exercise';
import { getNextDaySchedule } from './schedule';
import prisma from '../prisma';

export async function getFinishedWorkouts(
  userId: string,
  page?: number
): Promise<FinishedWorkoutWithExerciseWithSets[]> {
  let take: number | undefined = undefined;
  let skip: number | undefined = undefined;
  if (typeof page !== 'undefined') {
    take = 10;
    skip = (page - 1) * 10;
  }
  return prisma.finishedWorkout.findMany({
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take,
    skip,
  });
}

export async function getActiveWorkoutId(userId: string) {
  const onlyId = await prisma.workout.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });
  return onlyId?.id;
}

export async function getMinifiedActiveWorkout(userId: string) {
  return prisma.workout.findUnique({
    where: {
      userId,
    },
  });
}

export async function getFullActiveWorkout(
  userId: string
): Promise<FullWorkout | null> {
  return prisma.workout.findUnique({
    where: {
      userId,
    },
    include: {
      exercises: {
        include: {
          exercise: true,
          sets: true,
        },
      },
      checkins: true,
    },
  });
}

export async function addCheckInToActiveWorkout(userId: string) {
  const activeWorkoutId = await getActiveWorkoutId(userId);
  if (activeWorkoutId === null) {
    return;
  }
  await prisma.workoutCheckin.create({
    data: {
      at: new Date(),
      workout: {
        connect: {
          id: activeWorkoutId,
        },
      },
    },
  });
}

export async function startWorkout(userId: string) {
  const alreadyInProgressWorkout = await getActiveWorkoutId(userId);

  if (alreadyInProgressWorkout !== null) {
    return getFullActiveWorkout(userId);
  }

  const nextDaySchedule = await getNextDaySchedule(userId);
  if (!nextDaySchedule.day) {
    return null;
  }

  const { nickname, orderNumber, exercises } = nextDaySchedule.day;

  const workout = await prisma.workout.create({
    data: {
      userId,
      dayNumber: orderNumber,
      nickname,
      checkins: {
        create: {
          at: new Date(),
        },
      },
    },
  });
  await Promise.all(
    exercises.map(async (exerciseInSchedule) => {
      return prisma.workoutExercise.create({
        data: {
          workout: {
            connect: workout,
          },
          exercise: {
            connect: {
              id: exerciseInSchedule.exerciseId,
            },
          },
          orderNumber: exerciseInSchedule.orderNumber,
          exerciseType: exerciseInSchedule.exercise.exerciseType,
          primaryMuscleGroup: exerciseInSchedule.exercise.primaryMuscleGroup,
          sets: {
            createMany: {
              data: new Array(exerciseInSchedule.exercise.setCount).fill({
                complete: false,
                timeInSeconds:
                  exerciseInSchedule.exercise.exerciseType === 'timed'
                    ? exerciseInSchedule.exercise.timePerSetInSeconds
                    : undefined,
              }),
            },
          },
        },
      });
    })
  );
  return getFullActiveWorkout(userId);
}

export async function persistSetComplete(
  userId: string,
  exerciseIndex: number,
  setIndex: number,
  complete: boolean
) {
  await prisma.workoutExerciseSet.updateMany({
    data: {
      complete: true,
    },
    where: {
      orderNumber: {
        lt: complete ? setIndex : setIndex - 1,
      },
      workoutExercise: {
        orderNumber: exerciseIndex,
        workout: {
          userId,
        },
      },
    },
  });
  await prisma.workoutExerciseSet.updateMany({
    data: {
      complete: false,
    },
    where: {
      orderNumber: {
        lt: complete ? setIndex + 1 : setIndex,
      },
      workoutExercise: {
        orderNumber: exerciseIndex,
        workout: {
          userId,
        },
      },
    },
  });
  return getMinifiedActiveWorkout(userId);
}

export async function persistSetRepetitions(
  userId: string,
  exerciseIndex: number,
  setIndex: number,
  repetitions: number | undefined
) {
  await prisma.workoutExerciseSet.updateMany({
    data: {
      repetitions,
    },
    where: {
      orderNumber: setIndex,
      workoutExercise: {
        orderNumber: exerciseIndex,
        workout: {
          userId,
        },
      },
    },
  });
  return getMinifiedActiveWorkout(userId);
}

export async function persistSetResistance(
  userId: string,
  exerciseIndex: number,
  setIndex: number,
  resistanceInPounds: number | undefined
) {
  await prisma.workoutExerciseSet.updateMany({
    data: {
      resistanceInPounds,
    },
    where: {
      OR: [
        { orderNumber: setIndex },
        {
          AND: [
            {
              orderNumber: {
                gt: setIndex,
              },
              resistanceInPounds: null,
              repetitions: null,
            },
          ],
        },
      ],
      workoutExercise: {
        orderNumber: exerciseIndex,
        workout: {
          userId,
        },
      },
    },
  });
  return getMinifiedActiveWorkout(userId);
}

export async function replaceExercise(
  userId: string,
  exerciseIndex: number,
  newExerciseId: number
) {
  const activeWorkoutId = await getActiveWorkoutId(userId);
  if (activeWorkoutId === null) {
    return;
  }
  const newExercise = await getExerciseById(userId, newExerciseId);
  if (!newExercise) {
    return;
  }
  await prisma.workoutExercise.deleteMany({
    where: {
      workout: {
        userId,
      },
      orderNumber: exerciseIndex,
    },
  });
  await prisma.workoutExercise.create({
    data: {
      workout: {
        connect: {
          id: activeWorkoutId,
        },
      },
      exercise: {
        connect: {
          id: newExercise.id,
        },
      },
      orderNumber: exerciseIndex,
      exerciseType: newExercise.exerciseType,
      primaryMuscleGroup: newExercise.primaryMuscleGroup,
      sets: {
        createMany: {
          data: new Array(newExercise.setCount).fill({
            complete: false,
            timeInSeconds:
              newExercise.exerciseType === 'timed'
                ? newExercise.timePerSetInSeconds
                : undefined,
          }),
        },
      },
    },
  });
  return getMinifiedActiveWorkout(userId);
}

export async function addExercise(
  userId: string,
  exerciseId: number,
  index: number
) {
  const activeWorkoutId = await getActiveWorkoutId(userId);
  if (activeWorkoutId === null) {
    return;
  }
  const newExercise = await getExerciseById(userId, exerciseId);
  if (!newExercise) {
    return;
  }
  await prisma.workoutExercise.updateMany({
    data: {
      orderNumber: {
        increment: 1,
      },
    },
    where: {
      workout: {
        userId,
      },
      orderNumber: {
        gte: index,
      },
    },
  });
  await prisma.workoutExercise.create({
    data: {
      workout: {
        connect: {
          id: activeWorkoutId,
        },
      },
      exercise: {
        connect: {
          id: newExercise.id,
        },
      },
      orderNumber: index,
      exerciseType: newExercise.exerciseType,
      primaryMuscleGroup: newExercise.primaryMuscleGroup,
      sets: {
        createMany: {
          data: new Array(newExercise.setCount).fill({
            complete: false,
            timeInSeconds:
              newExercise.exerciseType === 'timed'
                ? newExercise.timePerSetInSeconds
                : undefined,
          }),
        },
      },
    },
  });
  return getMinifiedActiveWorkout(userId);
}

export async function deleteExercise(userId: string, index: number) {
  await prisma.workoutExercise.deleteMany({
    where: {
      workout: {
        userId,
      },
      orderNumber: index,
    },
  });
  await prisma.workoutExercise.updateMany({
    data: {
      orderNumber: {
        decrement: 1,
      },
    },
    where: {
      workout: {
        userId,
      },
      orderNumber: {
        gte: index,
      },
    },
  });
  return getMinifiedActiveWorkout(userId);
}

export async function endWorkout(userId: string) {
  const activeWorkout = await getFullActiveWorkout(userId);
  if (!activeWorkout) {
    return;
  }
  const checkIns = [
    ...activeWorkout.checkins.map((item) => item.at),
    new Date(),
  ];
  let durationInMilliseconds = 0;
  for (let index = 0; index < checkIns.length - 1; index++) {
    const checkIn = checkIns[index];
    const nextCheckIn = checkIns[index + 1];
    let durationBetweenCheckIns = differenceInMilliseconds(
      new Date(nextCheckIn),
      new Date(checkIn)
    );
    durationInMilliseconds += Math.min(
      durationBetweenCheckIns,
      minutesToMilliseconds(30)
    );
  }
  const durationInSeconds = millisecondsToSeconds(durationInMilliseconds);
  await prisma.$transaction(async (prisma) => {
    const finishedWorkout = await prisma.finishedWorkout.create({
      data: {
        dayNumber: activeWorkout.dayNumber,
        endedAt: new Date(),
        nickname: activeWorkout.nickname,
        durationInSeconds,
        createdAt: activeWorkout.createdAt,
        user: {
          connect: {
            userId,
          },
        },
      },
    });
    await Promise.all(
      activeWorkout.exercises.map((workoutExercise) =>
        prisma.finishedWorkoutExercise.create({
          data: {
            name: workoutExercise.exercise.name,
            exerciseType: workoutExercise.exercise.exerciseType,
            primaryMuscleGroup: workoutExercise.exercise.primaryMuscleGroup,
            orderNumber: workoutExercise.orderNumber,
            finishedWorkout: {
              connect: finishedWorkout,
            },
            sets: {
              createMany: {
                data: workoutExercise.sets.filter((set) => set.complete),
              },
            },
          },
        })
      )
    );
  });
  await discardWorkout(userId);
}

export async function discardWorkout(userId: string) {
  return prisma.workout.delete({
    where: {
      userId,
    },
  });
}

export async function getMostRecentCompletedWorkout(userId: string) {
  return prisma.finishedWorkout.findFirst({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getWorkoutInstancesByExerciseName(
  userId: string,
  name: string,
  page?: number
): Promise<FinishedWorkoutExerciseWithSets[]> {
  let take: number | undefined = undefined;
  let skip: number | undefined = undefined;
  if (typeof page !== 'undefined') {
    take = 10;
    skip = (page - 1) * 10;
  }
  return prisma.finishedWorkoutExercise.findMany({
    where: {
      name,
      finishedWorkout: {
        userId,
      },
    },
    include: {
      sets: true,
      finishedWorkout: true,
    },
    take,
    skip,
  });
}
