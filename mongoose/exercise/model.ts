import { ElementOf, stringLiterals } from '../../utils/oneof-array';
import { ExerciseMuscleGroups, IExercise, WeightTypes } from './interface';
import mongoose, { Model, Schema } from 'mongoose';

import { EJSON } from 'bson';

interface ExerciseModel extends Model<IExercise> {
    findByUserId: (userId: string) => Promise<
        (mongoose.Document<unknown, any, IExercise> &
            IExercise & {
                _id: string;
            })[]
    >;
    findByUserIdAndName: (
        userId: string,
        name: string
    ) => Promise<
        mongoose.Document<unknown, any, IExercise> &
            IExercise & {
                _id: string;
            }
    >;
}

const exerciseSchema = new Schema<IExercise, ExerciseModel>(
    {
        userId: {
            type: Schema.Types.ObjectId,
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

exerciseSchema.index({ userId: 1, name: 1 }, { unique: true });

exerciseSchema.static('findByUserId', async function (userId: string) {
    const result = await this.find({ userId }).exec();
    return EJSON.deserialize(result) as typeof result;
});

exerciseSchema.static(
    'findByUserIdAndName',
    async function (userId: string, name: string) {
        const result = await this.findOne({ userId, name }).exec();
        return !result ? null : (EJSON.deserialize(result) as typeof result);
    }
);

const Exercise =
    (mongoose.models.Exercise as ExerciseModel) ||
    mongoose.model('Exercise', exerciseSchema);

export default Exercise;
