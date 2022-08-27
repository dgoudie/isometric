import { Prisma } from '@prisma/client';

const FinishedWorkoutWithExerciseWithSets =
  Prisma.validator<Prisma.FinishedWorkoutArgs>()({
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

export type FinishedWorkoutWithExerciseWithSets =
  Prisma.FinishedWorkoutGetPayload<typeof FinishedWorkoutWithExerciseWithSets>;
