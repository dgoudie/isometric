import { ISettings } from '@dgoudie/isometric-types';
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema<ISettings>(
  {
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Settings =
  mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

export default Settings;
