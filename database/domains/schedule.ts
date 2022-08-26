import { ScheduleDayWithExerciseInSchedulesWithExercise } from '../../types/ScheduleDay';
import { getMostRecentCompletedWorkout } from './workout';
import prisma from '../prisma';

export async function getScheduledDays(
  userId: string
): Promise<ScheduleDayWithExerciseInSchedulesWithExercise[]> {
  return prisma.scheduleDay.findMany({
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
  day: ScheduleDayWithExerciseInSchedulesWithExercise | null;
  dayCount: number;
};

export async function getNextDaySchedule(
  userId: string
): Promise<NextDaySchedule> {
  let dayNumber = 0;
  const lastWorkout = await getMostRecentCompletedWorkout(userId);
  if (!!lastWorkout) {
    dayNumber = lastWorkout.dayNumber + 1;
  }
  const dayCount = await prisma.scheduleDay.count({
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
  const day = await prisma.scheduleDay.findFirst({
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
