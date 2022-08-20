import { ISchedule } from '@dgoudie/isometric-types';
import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema<ISchedule>(
  {
    userId: String,
    days: [
      {
        nickname: String,
        exerciseIds: [mongoose.Types.ObjectId],
      },
    ],
  },
  { timestamps: true }
);

const Schedule =
  mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);

export default Schedule;
