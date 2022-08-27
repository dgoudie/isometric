import { Prisma } from '@prisma/client';

const ActiveWorkoutExerciseWithSetsAndDetails =
  Prisma.validator<Prisma.ActiveWorkoutExerciseArgs>()({
    include: {
      exercise: true,
      sets: true,
    },
  });

export type ActiveWorkoutExerciseWithSetsAndDetails =
  Prisma.ActiveWorkoutExerciseGetPayload<
    typeof ActiveWorkoutExerciseWithSetsAndDetails
  >;
