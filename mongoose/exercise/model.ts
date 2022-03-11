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
    'glutes',
    'lower back'
);

export type ExerciseMuscleGroup = ElementOf<typeof ExerciseMuscleGroups>;

export const WeightTypes = stringLiterals('standard', 'assisted');

export type WeightType = ElementOf<typeof WeightTypes>;

export interface ExerciseModel {
    userId: Schema.Types.ObjectId;
    name: string;
    breakTimeInSeconds: number;
    primaryMuscleGroup: ExerciseMuscleGroup;
    secondaryMuscleGroups?: ExerciseMuscleGroup[];
    weightType: WeightType;
}

const exerciseSchema = new Schema<ExerciseModel>(
    {
        userId: {
            type: String,
            required: true,
            ref: 'Settings',
        },
        name: { type: String, required: true, trim: true },
        breakTimeInSeconds: { type: Number, required: true, default: 120 },
        primaryMuscleGroup: {
            type: String,
            required: true,
            enum: ExerciseMuscleGroups,
        },
        secondaryMuscleGroups: { type: [String], enum: ExerciseMuscleGroups },
        weightType: {
            type: String,
            default: 'standard',
            enum: WeightTypes,
        },
    },
    { timestamps: true }
);

const Exercise =
    (mongoose.models.Exercise as Model<ExerciseModel>) ||
    mongoose.model('Exercise', exerciseSchema);

export default Exercise;
