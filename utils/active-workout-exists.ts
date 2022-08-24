import { getMinifiedActiveWorkout } from '../database/domains/workout';

export default async function activeWorkoutExists(userId: string) {
  const activeWorkout = await getMinifiedActiveWorkout(userId);
  return !!activeWorkout;
}
