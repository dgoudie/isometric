import { Prisma } from '@prisma/client';

// ***************

// ***************

// ***************

const FinishedWorkoutExerciseWithSets =
  Prisma.validator<Prisma.FinishedWorkoutExerciseArgs>()({
    include: {
      sets: true,
      finishedWorkout: true,
    },
  });

export type FinishedWorkoutExerciseWithSets =
  Prisma.FinishedWorkoutExerciseGetPayload<
    typeof FinishedWorkoutExerciseWithSets
  >;
