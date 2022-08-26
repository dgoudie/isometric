import { Prisma } from '@prisma/client';

const ScheduleWithScheduleDaysWithExerciseInSchedules =
  Prisma.validator<Prisma.ScheduleArgs>()({
    include: {
      days: {
        include: {
          exercises: true,
        },
      },
    },
  });

export type ScheduleWithScheduleDaysWithExerciseInSchedules =
  Prisma.ScheduleGetPayload<
    typeof ScheduleWithScheduleDaysWithExerciseInSchedules
  >;
