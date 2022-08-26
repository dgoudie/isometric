import { Schedule } from '@prisma/client';
import { ScheduleWithFullDetail } from '../../types';
import { getMostRecentCompletedWorkout } from './workout';
import prisma from '../prisma';

export async function createSchedule(userId: string) {
  return prisma.schedule.create({
    data: {
      user: {
        connect: {
          userId,
        },
      },
    },
  });
}

export async function getSchedule(userId: string) {
  return prisma.schedule.findUnique({
    where: { userId },
    include: {
      days: {
        include: {
          exercises: {
            include: { exercise: true },
          },
        },
      },
    },
  });
}

export async function saveSchedule(userId: string, schedule: Schedule) {
  // await connectMongo();
  // return Schedule.updateOne(
  //   { userId },
  //   { ...schedule, userId },
  //   { upsert: true }
  // );
}

export async function getNextDaySchedule(userId: string): Promise<{
  day: ScheduleWithFullDetail['days'][0] | null;
  dayCount: number;
}> {
  let dayNumber = 0;
  const lastWorkout = await getMostRecentCompletedWorkout(userId);
  if (!!lastWorkout) {
    dayNumber = lastWorkout.dayNumber + 1;
  }
  const dayCount = await prisma.scheduleDay.count({
    where: {
      schedule: {
        userId,
      },
    },
  });
  if (dayCount === 0) {
    return { dayCount: 0, day: null };
  }
  const day = await prisma.scheduleDay.findFirst({
    where: {
      orderNumber: dayNumber,
      schedule: {
        userId,
      },
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
