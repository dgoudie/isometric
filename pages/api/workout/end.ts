import { NextApiHandler } from 'next';
import { broadcastWorkoutUpdate } from '../../../utils/broadcast-workout-update';
import { endWorkout } from '../../../database/domains/workout';
import { getUserId } from '../../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  await endWorkout(userId);
  await broadcastWorkoutUpdate(userId, null);
  res.status(204).end();
};

export default handler;
