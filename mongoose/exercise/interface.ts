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

export const WeightTypes = stringLiterals('standard', 'assisted');

export type WeightType = ElementOf<typeof WeightTypes>;

export interface IExercise {
    userId: Schema.Types.ObjectId;
    name: string;
    breakTimeInSeconds: number;
    primaryMuscleGroup: ExerciseMuscleGroup;
    secondaryMuscleGroups?: ExerciseMuscleGroup[];
    weightType: WeightType;
}
