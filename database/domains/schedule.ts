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

export async function cleanUpScheduledWorkoutOrderNumbers(
  userId: string
): Promise<void> {
  // await prisma.$transaction(async () => {
  const orderedScheduledWorkouts = await prisma.scheduledWorkout.findMany({
    where: { userId },
    orderBy: {
      orderNumber: 'asc',
    },
    select: {
      id: true,
    },
  });
  for (
    let orderNumber = 0;
    orderNumber < orderedScheduledWorkouts.length;
    orderNumber++
  ) {
    await prisma.scheduledWorkout.update({
      where: { id: orderedScheduledWorkouts[orderNumber].id },
      data: { orderNumber },
    });
  }
  // });
}
