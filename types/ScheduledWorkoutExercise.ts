import { Prisma } from '@prisma/client';

const ScheduledWorkoutExerciseWithExercise =
  Prisma.validator<Prisma.ScheduledWorkoutExerciseArgs>()({
    include: {
      exercise: true,
    },
  });

export type ScheduledWorkoutExerciseWithExercise =
  Prisma.ScheduledWorkoutExerciseGetPayload<
    typeof ScheduledWorkoutExerciseWithExercise
  >;
