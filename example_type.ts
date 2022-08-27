import { Prisma } from '@prisma/client';

const FullWorkout = Prisma.validator<Prisma.ActiveWorkoutArgs>()({
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

export type FullWorkout = Prisma.ActiveWorkoutGetPayload<typeof FullWorkout>;

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
