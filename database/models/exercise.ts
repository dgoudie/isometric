import { IExercise } from '@dgoudie/isometric-types';
import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema<IExercise>(
  {
    userId: String,
    name: String,
    breakTimeInSeconds: Number,
    setCount: Number,
    timePerSetInSeconds: Number,
    primaryMuscleGroup: String,
    secondaryMuscleGroups: [String],
    exerciseType: String,
    minimumRecommendedRepetitions: Number,
    maximumRecommendedRepetitions: Number,
  },
  { timestamps: true }
);

exerciseSchema.index({ userId: 1, name: 1 }, { unique: true });

const Exercise =
  mongoose.models.Exercise || mongoose.model('Exercise', exerciseSchema);

export default Exercise;
