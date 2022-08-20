import Settings from '../models/settings.js';

export function getSettings(userId: string) {
  return Settings.findOne({ userId });
}
