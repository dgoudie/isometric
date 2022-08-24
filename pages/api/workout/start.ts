import { NextApiHandler } from 'next';
import { broadcastWorkoutUpdate } from '../../../utils/broadcast-workout-update';
import { getUserId } from '../../../utils/get-user-id';
import { startWorkout } from '../../../database/domains/workout';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const workout = await startWorkout(userId);
  await broadcastWorkoutUpdate(userId, workout);
  res.status(204).end();
};

export default handler;
