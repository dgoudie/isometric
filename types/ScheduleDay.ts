import { Prisma } from '@prisma/client';

const ScheduledWorkoutWithExerciseInSchedules =
  Prisma.validator<Prisma.ScheduledWorkoutArgs>()({
    include: {
      exercises: true,
    },
  });

export type ScheduledWorkoutWithExerciseInSchedules =
  Prisma.ScheduledWorkoutGetPayload<
    typeof ScheduledWorkoutWithExerciseInSchedules
  >;

const ScheduledWorkoutWithExerciseInSchedulesWithExercise =
  Prisma.validator<Prisma.ScheduledWorkoutArgs>()({
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
  });

export type ScheduledWorkoutWithExerciseInSchedulesWithExercise =
  Prisma.ScheduledWorkoutGetPayload<
    typeof ScheduledWorkoutWithExerciseInSchedulesWithExercise
  >;
