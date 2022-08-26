import { Prisma } from '@prisma/client';

const ScheduleDayWithExerciseInSchedules =
  Prisma.validator<Prisma.ScheduleDayArgs>()({
    include: {
      exercises: true,
    },
  });

export type ScheduleDayWithExerciseInSchedules = Prisma.ScheduleDayGetPayload<
  typeof ScheduleDayWithExerciseInSchedules
>;

const ScheduleDayWithExerciseInSchedulesWithExercise =
  Prisma.validator<Prisma.ScheduleDayArgs>()({
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
  });

export type ScheduleDayWithExerciseInSchedulesWithExercise =
  Prisma.ScheduleDayGetPayload<
    typeof ScheduleDayWithExerciseInSchedulesWithExercise
  >;
