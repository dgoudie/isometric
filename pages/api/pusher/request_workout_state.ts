import { NextApiHandler } from 'next';
import { broadcastWorkoutUpdate } from '../../../utils/broadcast-workout-update';
import { getMinifiedActiveWorkout } from '../../../database/domains/workout';
import { getUserId } from '../../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = getUserId(req);
  const workout = await getMinifiedActiveWorkout(userId);
  broadcastWorkoutUpdate(userId, workout);
  res.end();
};

export default handler;
