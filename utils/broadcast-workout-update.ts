import { FullWorkout } from '../types';
import getPusher from './pusher';

export const broadcastWorkoutUpdate = (
  userId: string,
  workout: FullWorkout | null
) => getPusher().sendToUser(userId, 'workout_state', workout);
