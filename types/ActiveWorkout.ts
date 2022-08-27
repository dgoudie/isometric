import { Prisma } from '@prisma/client';

const ActiveWorkoutWithExercisesWithExerciseWithSetsAndDetails =
  Prisma.validator<Prisma.ActiveWorkoutArgs>()({
    include: {
      exercises: {
        include: {
          exercise: true,
          sets: true,
        },
      },
      checkins: true,
    },
  });

export type ActiveWorkoutWithExercisesWithExerciseWithSetsAndDetails =
  Prisma.ActiveWorkoutGetPayload<
    typeof ActiveWorkoutWithExercisesWithExerciseWithSetsAndDetails
  >;
