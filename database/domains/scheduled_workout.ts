import { Prisma, PrismaClient } from '@prisma/client';

import { ScheduledWorkoutWithExerciseInSchedulesWithExercise } from '../../types/ScheduledWorkout';
import prisma from '../prisma';

export async function getScheduledDays(
  userId: string
): Promise<ScheduledWorkoutWithExerciseInSchedulesWithExercise[]> {
  return prisma.scheduledWorkout.findMany({
    where: { userId },
    include: {
      exercises: {
        include: { exercise: true },
        orderBy: {
          orderNumber: 'asc',
        },
      },
    },
    orderBy: {
      orderNumber: 'asc',
    },
  });
}

export type NextDaySchedule = {
  day: ScheduledWorkoutWithExerciseInSchedulesWithExercise | null;
  dayCount: number;
};

export async function getNextDaySchedule(
  userId: string
): Promise<NextDaySchedule> {
  let dayNumber = 0;
  const lastWorkout = await prisma.finishedWorkout.findFirst({
    where: { userId },
    orderBy: {
      startedAt: 'desc',
    },
  });
  if (!!lastWorkout) {
    dayNumber = lastWorkout.orderNumber + 1;
  }
  const dayCount = await prisma.scheduledWorkout.count({
    where: {
      userId,
    },
  });
  if (dayCount === 0) {
    return { dayCount: 0, day: null };
  }
  if (dayNumber >= dayCount) {
    dayNumber = 0;
  }
  const day = await prisma.scheduledWorkout.findFirst({
    where: {
      orderNumber: dayNumber,
      userId,
    },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
        orderBy: {
          orderNumber: 'asc',
        },
      },
    },
  });
  return { day, dayCount };
}

export async function reindexScheduledWorkouts(
  userId: string,
  prisma: PrismaClient | Prisma.TransactionClient
): Promise<void> {
  const maxOrderNumberRecord = await prisma.scheduledWorkout.findFirst({
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
      "ScheduledWorkout" sw
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
        "ScheduledWorkout" sw
      where
        "userId" = ${userId} ) derivedOrder
    where
      "userId" = ${userId}
      and sw.id = derivedOrder.id
  `;
}
