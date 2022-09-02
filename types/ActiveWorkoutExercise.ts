import {
  ActiveWorkoutExercise,
  ActiveWorkoutExerciseSet,
} from '@prisma/client';

import { ExerciseWithPersonalBestAndLastPerformed } from '../database/domains/exercise';

export type ActiveWorkoutExerciseWithSetsAndDetails = ActiveWorkoutExercise & {
  exercise: ExerciseWithPersonalBestAndLastPerformed;
  sets: ActiveWorkoutExerciseSet[];
};
