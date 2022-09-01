import { Prisma, PrismaClient } from '@prisma/client';
import {
  differenceInMilliseconds,
  millisecondsToSeconds,
  minutesToMilliseconds,
} from 'date-fns';

import { ActiveWorkoutExerciseWithSetsAndDetails } from '../../types/ActiveWorkoutExercise';
import { ActiveWorkoutWithExercisesWithExerciseWithSetsAndDetails } from '../../types/ActiveWorkout';
import { FinishedWorkoutExerciseWithSets } from '../../example_type';
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
          sets: {
            orderBy: {
              orderNumber: 'asc',
            },
          },
        },
        orderBy: {
          orderNumber: 'asc',
        },
      },
    },
    where: { userId },
    orderBy: { startedAt: 'desc' },
    take,
    skip,
  });
}

export async function hasActiveWorkout(userId: string): Promise<boolean> {
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

export async function getActiveWorkout(userId: string) {
  return prisma.activeWorkout.findUnique({
    where: {
      userId,
    },
  });
}

export async function getFullActiveWorkout(
  userId: string
): Promise<ActiveWorkoutWithExercisesWithExerciseWithSetsAndDetails | null> {
  return prisma.activeWorkout.findUnique({
    where: {
      userId,
    },
    include: {
      exercises: {
        include: {
          exercise: true,
          sets: {
            orderBy: {
              orderNumber: 'asc',
            },
          },
        },
        orderBy: {
          orderNumber: 'asc',
        },
      },
      checkins: true,
    },
  });
}

export async function addCheckInToActiveWorkout(userId: string) {
  const activeWorkoutId = await hasActiveWorkout(userId);
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

export async function startWorkout(userId: string): Promise<void> {
  const _hasActiveWorkout = await hasActiveWorkout(userId);
  if (_hasActiveWorkout) {
    return;
  }

  const nextDaySchedule = await getNextDaySchedule(userId);
  if (!nextDaySchedule.day) {
    return;
  }

  const { nickname, orderNumber, exercises } = nextDaySchedule.day;

  await prisma.$transaction(async (prisma) => {
    await prisma.activeWorkout.create({
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
    await prisma.activeWorkoutExercise.createMany({
      data: exercises.map((exerciseInSchedule) => ({
        orderNumber: exerciseInSchedule.orderNumber,
        userId: userId,
        exerciseId: exerciseInSchedule.exerciseId,
      })),
    });
    const activeWorkoutExercisesCreated =
      await prisma.activeWorkoutExercise.findMany({
        where: {
          userId,
        },
        include: {
          exercise: true,
        },
      });
    await prisma.activeWorkoutExerciseSet.createMany({
      data: activeWorkoutExercisesCreated
        .map((activeWorkoutExerciseCreated) =>
          new Array(activeWorkoutExerciseCreated.exercise.setCount)
            .fill(null)
            .map((_, orderNumber) => ({
              activeWorkoutExerciseId: activeWorkoutExerciseCreated.id,
              orderNumber,
              complete: false,
              timeInSeconds:
                activeWorkoutExerciseCreated.exercise.exerciseType === 'timed'
                  ? activeWorkoutExerciseCreated.exercise.timePerSetInSeconds
                  : undefined,
            }))
        )
        .reduce((acc, setList) => [...acc, ...setList]),
    });
  });
}

export async function persistSetComplete(
  userId: string,
  activeWorkoutExerciseId: string,
  orderNumber: number,
  complete: boolean
) {
  await prisma.$transaction(async (prisma) => {
    await prisma.activeWorkoutExerciseSet.updateMany({
      data: {
        complete: true,
      },
      where: {
        orderNumber: {
          lte: complete ? orderNumber : orderNumber - 1,
        },
        activeWorkoutExerciseId,
        activeWorkoutExercise: {
          userId,
        },
      },
    });
    await prisma.activeWorkoutExerciseSet.updateMany({
      data: {
        complete: false,
      },
      where: {
        orderNumber: {
          gte: complete ? orderNumber + 1 : orderNumber,
        },
        activeWorkoutExercise: {
          userId,
          id: activeWorkoutExerciseId,
        },
      },
    });
  });
}

export async function persistSetRepetitions(
  userId: string,
  activeWorkoutExerciseId: string,
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
        id: activeWorkoutExerciseId,
        userId,
      },
    },
  });
}

export async function persistSetResistance(
  userId: string,
  activeWorkoutExerciseId: string,
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
          // this weird snippet basically disables updating future sets if resistanceInPounds is null so we dont clear future sets
          orderNumber:
            resistanceInPounds !== null
              ? {
                  gt: setIndex,
                }
              : { lt: -1 },
          complete: false,
          OR: [{ resistanceInPounds: null }, { repetitions: null }],
        },
      ],
      activeWorkoutExercise: {
        userId,
        id: activeWorkoutExerciseId,
      },
    },
  });
}

export class ReplaceExerciseError extends Error {}

export async function replaceExercise(
  userId: string,
  exerciseIndex: number,
  newExerciseId: string
): Promise<ActiveWorkoutExerciseWithSetsAndDetails> {
  const newExercise = await getExerciseById(userId, newExerciseId);
  if (!newExercise) {
    throw new ReplaceExerciseError('no active workout');
  }
  return prisma.$transaction(async (prisma) => {
    const result = await prisma.activeWorkoutExercise.deleteMany({
      where: {
        activeWorkout: {
          userId,
        },
        orderNumber: exerciseIndex,
      },
    });
    if (result.count === 0) {
      throw new ReplaceExerciseError('No record could be deleted.');
    }
    const newRecord = await prisma.activeWorkoutExercise.create({
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
            data: new Array(newExercise.setCount)
              .fill(null)
              .map((_, orderNumber) => ({
                orderNumber,
                complete: false,
                timeInSeconds:
                  newExercise.exerciseType === 'timed'
                    ? newExercise.timePerSetInSeconds
                    : undefined,
              })),
          },
        },
      },
    });
    const newRecordFound: ActiveWorkoutExerciseWithSetsAndDetails =
      (await prisma.activeWorkoutExercise.findUnique({
        where: {
          id: newRecord.id,
        },
        include: {
          exercise: true,
          sets: {
            orderBy: {
              orderNumber: 'asc',
            },
          },
        },
      }))!;
    return newRecordFound;
  });
}

export async function addExercise(
  userId: string,
  exerciseId: string,
  index: number
) {
  const activeWorkoutId = await hasActiveWorkout(userId);
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
  await prisma.$transaction(async (prisma) => {
    const result = await prisma.activeWorkoutExercise.deleteMany({
      where: {
        activeWorkout: {
          userId,
        },
        orderNumber: index,
      },
    });
    if (result.count === 0) {
      return;
    }
    const activeWorkoutExercise = await prisma.activeWorkoutExercise.count({
      where: { userId },
    });
    await prisma.activeWorkoutExercise.updateMany({
      data: {
        orderNumber: {
          increment: activeWorkoutExercise + 1,
        },
      },
      where: {
        activeWorkout: {
          userId,
        },
        orderNumber: {
          gt: index,
        },
      },
    });
    await reindexActiveWorkoutExercises(userId, prisma);
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
  const finishedWorkout = await prisma.finishedWorkout.create({
    data: {
      orderNumber: activeWorkout.orderNumber,
      endedAt: new Date(),
      nickname: activeWorkout.nickname,
      durationInSeconds,
      startedAt: activeWorkout.createdAt,
      userId,
    },
  });
  await Promise.all(
    activeWorkout.exercises
      .filter(
        (activeWorkoutExercise) =>
          !!activeWorkoutExercise.sets.find((set) => set.complete)
      )
      .map((workoutExercise) =>
        prisma.finishedWorkoutExercise.create({
          data: {
            name: workoutExercise.exercise.name,
            exerciseType: workoutExercise.exercise.exerciseType,
            primaryMuscleGroup: workoutExercise.exercise.primaryMuscleGroup,
            orderNumber: workoutExercise.orderNumber,
            finishedWorkoutId: finishedWorkout.id,
            sets: {
              createMany: {
                data: workoutExercise.sets
                  .filter((set) => set.complete)
                  .map(({ complete, activeWorkoutExerciseId, ...set }) => set),
              },
            },
          },
        })
      )
  );
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
    take = 20;
    skip = (page - 1) * 20;
  }
  return prisma.finishedWorkoutExercise.findMany({
    where: {
      name,
      finishedWorkout: {
        userId,
      },
    },
    include: {
      sets: {
        orderBy: {
          orderNumber: 'asc',
        },
      },
      finishedWorkout: true,
    },
    orderBy: {
      finishedWorkout: {
        startedAt: 'desc',
      },
    },
    take,
    skip,
  });
}

export async function reindexActiveWorkoutExercises(
  userId: string,
  prisma: PrismaClient | Prisma.TransactionClient
): Promise<void> {
  const maxOrderNumberRecord = await prisma.activeWorkoutExercise.findFirst({
    where: { userId },
    orderBy: {
      orderNumber: 'desc',
    },
  });
  if (!maxOrderNumberRecord) {
    return;
  }
  const maxOrderNumber = maxOrderNumberRecord.orderNumber;
  await reindex(userId, maxOrderNumber + 1, prisma);
  await reindex(userId, 0, prisma);
}

async function reindex(
  userId: string,
  padding: number,
  prisma: PrismaClient | Prisma.TransactionClient
) {
  await prisma.$executeRaw`
    update
      "ActiveWorkoutExercise" awe
    set
      "orderNumber" = derivedOrder.order - 1 + cast(${padding} as int)
    from
      (
      select
        row_number() over (
      order by
        "orderNumber") as order,
        id
      from
        "ActiveWorkoutExercise" awe
      where
        "userId" = ${userId} ) derivedOrder
    where
      "userId" = ${userId}
      and awe.id = derivedOrder.id
  `;
}
