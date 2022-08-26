import { NextApiHandler } from 'next';
import { getUserId } from '../../../utils/get-user-id';
import { startWorkout } from '../../../database/domains/workout';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const workout = await startWorkout(userId);
  res.status(204).end();
};

export default handler;
