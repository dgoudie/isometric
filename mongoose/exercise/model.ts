import { ElementOf, stringLiterals } from '../../utils/oneof-array';
import { Model, Schema } from 'mongoose';

import mongoose from 'mongoose';

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
    'glutes'
);

export type ExerciseMuscleGroup = ElementOf<typeof ExerciseMuscleGroups>;

export interface ExerciseModel {
    userId: string;
    name: string;
    breakTimeInSeconds: number;
    primaryMuscleGroup: ExerciseMuscleGroup;
    secondaryMuscleGroup?: ExerciseMuscleGroup;
}

const exerciseSchema = new Schema<ExerciseModel>({
    userId: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    breakTimeInSeconds: { type: Number, required: true, default: 120 },
    primaryMuscleGroup: {
        type: String,
        required: true,
        enum: ExerciseMuscleGroups,
    },
    secondaryMuscleGroup: { type: String, enum: ExerciseMuscleGroups },
});

export default (mongoose.models.Exercise as Model<ExerciseModel>) ||
    mongoose.model('Exercise', exerciseSchema);
