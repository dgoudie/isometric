import { IWorkout } from '@dgoudie/isometric-types';
import Pusher from './pusher';

export const broadcastWorkoutUpdate = (
  userId: string,
  workout: Partial<IWorkout> | null
) => Pusher.trigger(userId, 'workout_state', workout);
