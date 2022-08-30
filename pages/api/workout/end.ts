import { NextApiHandler } from 'next';
import broadcastApiMutations from '../../../utils/broadcast-api-mutations';
import { endWorkout } from '../../../database/domains/active_workout';
import { getUserId } from '../../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  await endWorkout(userId);
  await broadcastApiMutations(userId, ['/api/workout/exists', '/api/workouts']);
  res.status(204).end();
};

export default handler;
