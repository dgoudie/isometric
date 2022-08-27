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

const WorkoutExerciseWithSetsAndDetails =
  Prisma.validator<Prisma.ActiveWorkoutExerciseArgs>()({
    include: {
      exercise: true,
      sets: true,
    },
  });

export type WorkoutExerciseWithSetsAndDetails =
  Prisma.ActiveWorkoutExerciseGetPayload<
    typeof WorkoutExerciseWithSetsAndDetails
  >;

// ***************

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
