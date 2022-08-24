import { IWorkout } from '@dgoudie/isometric-types';
import getPusher from './pusher';

export const broadcastWorkoutUpdate = (
  userId: string,
  workout: Partial<IWorkout> | null
) => getPusher().sendToUser(userId, 'workout_state', workout);
