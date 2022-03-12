import { ElementOf, stringLiterals } from '../../utils/oneof-array';

import { Schema } from 'mongoose';

export const ExerciseMuscleGroups = stringLiterals(
    'shoulders',
    'chest',
    'forearms',
    'obliques',
    'quads',
    'cardio',
    'biceps',
    'abs',
    'adductors',
    'traps',
    'triceps',
    'abductors',
    'hamstrings',
    'calves',
    'lats',
    'lower',
    'glutes',
    'lower back'
);

export type ExerciseMuscleGroup = ElementOf<typeof ExerciseMuscleGroups>;

export const ExerciseTypes = stringLiterals(
    'weighted',
    'assisted',
    'rep_based',
    'timed'
);

export type ExerciseType = ElementOf<typeof ExerciseTypes>;

export interface IExercise {
    userId: Schema.Types.ObjectId;
    name: string;
    setCount: number;
    timePerSetInSeconds?: number;
    minimumRecommendedRepetitions?: number;
    maximumRecommendedRepetitions?: number;
    breakTimeInSeconds: number;
    primaryMuscleGroup: ExerciseMuscleGroup;
    secondaryMuscleGroups?: ExerciseMuscleGroup[];
    exerciseType: ExerciseType;
}
