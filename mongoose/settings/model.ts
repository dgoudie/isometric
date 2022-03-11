import { Model, Schema } from 'mongoose';

import mongoose from 'mongoose';

export interface SettingsModel {
    userId: String;
}

const settingsSchema = new Schema<SettingsModel>(
    {
        userId: { type: String, required: true },
    },
    { timestamps: true }
);

const Settings =
    (mongoose.models.Settings as Model<SettingsModel>) ||
    mongoose.model('Settings', settingsSchema);

export default Settings;
