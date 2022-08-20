import { ISettings, IWorkout } from '@dgoudie/isometric-types';

import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema<IWorkout>(
  {
    userId: String,
    endedAt: Date,
    dayNumber: Number,
    nickname: String,
    checkIns: [Date],
    durationInSeconds: Number,
    exercises: [
      {
        _id: mongoose.Types.ObjectId,
        name: String,
        exerciseType: String,
        primaryMuscleGroup: String,
        performedAt: Date,
        sets: [
          {
            resistanceInPounds: Number,
            repetitions: Number,
            timeInSeconds: Number,
            complete: Boolean,
            _id: false,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Workout =
  mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export default Workout;
