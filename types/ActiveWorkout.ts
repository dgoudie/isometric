import {
  ActiveWorkout,
  ActiveWorkoutCheckin,
  ActiveWorkoutExercise,
  ActiveWorkoutExerciseSet,
} from '@prisma/client';

import { ExerciseWithPersonalBestAndLastPerformed } from '../database/domains/exercise';

export type ActiveWorkoutWithExercisesWithExerciseWithSetsAndDetails =
  ActiveWorkout & {
    exercises: (ActiveWorkoutExercise & {
      exercise: ExerciseWithPersonalBestAndLastPerformed;
      sets: ActiveWorkoutExerciseSet[];
    })[];
    checkins: ActiveWorkoutCheckin[];
  };
