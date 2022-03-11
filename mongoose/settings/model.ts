import { Model, Schema } from 'mongoose';

import mongoose from 'mongoose';

export interface SettingsModel {
    userId: Schema.Types.ObjectId;
}

const settingsSchema = new Schema<SettingsModel>(
    {
        userId: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true }
);

const Settings =
    (mongoose.models.Settings as Model<SettingsModel>) ||
    mongoose.model('Settings', settingsSchema);

export default Settings;
