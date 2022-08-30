import {
  FinishedWorkoutExerciseWithSets,
  FullWorkout,
} from '../../example_type';
import {
  differenceInMilliseconds,
  millisecondsToSeconds,
  minutesToMilliseconds,
} from 'date-fns';

import { FinishedWorkoutWithExerciseWithSets } from '../../types/FinishedWorkout';
import { getExerciseById } from './exercise';
import { getNextDaySchedule } from './scheduled_workout';
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
    orderBy: { startedAt: 'desc' },
    take,
    skip,
  });
}

export async function getActiveWorkoutId(userId: string): Promise<boolean> {
  const activeWorkout = await prisma.activeWorkout.findUnique({
    where: {
      userId,
    },
    select: {
      userId: true,
    },
  });
  return !!activeWorkout;
}

export async function getMinifiedActiveWorkout(userId: string) {
  return prisma.activeWorkout.findUnique({
    where: {
      userId,
    },
  });
}

export async function getFullActiveWorkout(
  userId: string
): Promise<FullWorkout | null> {
  return prisma.activeWorkout.findUnique({
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
  await prisma.activeWorkoutCheckin.create({
    data: {
      at: new Date(),
      workout: {
        connect: {
          userId,
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

  const workout = await prisma.activeWorkout.create({
    data: {
      userId,
      orderNumber,
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
      return prisma.activeWorkoutExercise.create({
        data: {
          orderNumber: exerciseInSchedule.orderNumber,
          activeWorkout: {
            connect: workout,
          },
          exercise: {
            connect: {
              id: exerciseInSchedule.exerciseId,
            },
          },
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
  await prisma.activeWorkoutExerciseSet.updateMany({
    data: {
      complete: true,
    },
    where: {
      orderNumber: {
        lt: complete ? setIndex : setIndex - 1,
      },
      activeWorkoutExercise: {
        userId,
        orderNumber: exerciseIndex,
      },
    },
  });
  await prisma.activeWorkoutExerciseSet.updateMany({
    data: {
      complete: false,
    },
    where: {
      orderNumber: {
        lt: complete ? setIndex + 1 : setIndex,
      },
      activeWorkoutExercise: {
        userId,
        orderNumber: exerciseIndex,
      },
    },
  });
}

export async function persistSetRepetitions(
  userId: string,
  exerciseIndex: number,
  setIndex: number,
  repetitions: number | undefined
) {
  await prisma.activeWorkoutExerciseSet.updateMany({
    data: {
      repetitions,
    },
    where: {
      orderNumber: setIndex,
      activeWorkoutExercise: {
        orderNumber: exerciseIndex,
        activeWorkout: {
          userId,
        },
      },
    },
  });
}

export async function persistSetResistance(
  userId: string,
  exerciseIndex: number,
  setIndex: number,
  resistanceInPounds: number | undefined
) {
  await prisma.activeWorkoutExerciseSet.updateMany({
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
      activeWorkoutExercise: {
        userId,
        orderNumber: exerciseIndex,
      },
    },
  });
}

export async function replaceExercise(
  userId: string,
  exerciseIndex: number,
  newExerciseId: string
) {
  const activeWorkout = await getMinifiedActiveWorkout(userId);
  if (activeWorkout === null) {
    return;
  }
  const newExercise = await getExerciseById(userId, newExerciseId);
  if (!newExercise) {
    return;
  }
  await prisma.activeWorkoutExercise.deleteMany({
    where: {
      activeWorkout: {
        userId,
      },
      orderNumber: exerciseIndex,
    },
  });
  await prisma.activeWorkoutExercise.create({
    data: {
      orderNumber: exerciseIndex,
      activeWorkout: {
        connect: {
          userId,
        },
      },
      exercise: {
        connect: {
          id: newExercise.id,
        },
      },
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
  exerciseId: string,
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
  await prisma.activeWorkoutExercise.updateMany({
    data: {
      orderNumber: {
        increment: 1,
      },
    },
    where: {
      activeWorkout: {
        userId,
      },
      orderNumber: {
        gte: index,
      },
    },
  });
  await prisma.activeWorkoutExercise.create({
    data: {
      activeWorkout: {
        connect: {
          userId,
        },
      },
      exercise: {
        connect: {
          id: newExercise.id,
        },
      },
      orderNumber: index,
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
}

export async function deleteExercise(userId: string, index: number) {
  await prisma.activeWorkoutExercise.deleteMany({
    where: {
      activeWorkout: {
        userId,
      },
      orderNumber: index,
    },
  });
  await prisma.activeWorkoutExercise.updateMany({
    data: {
      orderNumber: {
        decrement: 1,
      },
    },
    where: {
      activeWorkout: {
        userId,
      },
      orderNumber: {
        gte: index,
      },
    },
  });
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
        orderNumber: activeWorkout.orderNumber,
        endedAt: new Date(),
        nickname: activeWorkout.nickname,
        durationInSeconds,
        startedAt: activeWorkout.createdAt,
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
  return prisma.activeWorkout.delete({
    where: {
      userId,
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
