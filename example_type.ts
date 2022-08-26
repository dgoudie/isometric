import { Prisma } from '@prisma/client';

const FullWorkout = Prisma.validator<Prisma.WorkoutArgs>()({
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

export type FullWorkout = Prisma.WorkoutGetPayload<typeof FullWorkout>;

// ***************

const WorkoutExerciseWithSetsAndDetails =
  Prisma.validator<Prisma.WorkoutExerciseArgs>()({
    include: {
      exercise: true,
      sets: true,
    },
  });

export type WorkoutExerciseWithSetsAndDetails =
  Prisma.WorkoutExerciseGetPayload<typeof WorkoutExerciseWithSetsAndDetails>;

// ***************

const ScheduleWithFullDetail = Prisma.validator<Prisma.ScheduleArgs>()({
  include: {
    days: {
      include: {
        exercises: {
          include: { exercise: true },
        },
      },
    },
  },
});

export type ScheduleWithFullDetail = Prisma.ScheduleGetPayload<
  typeof ScheduleWithFullDetail
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
