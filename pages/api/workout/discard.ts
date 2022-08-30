import { NextApiHandler } from 'next';
import { discardWorkout } from '../../../database/domains/active_workout';
import { getUserId } from '../../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  await discardWorkout(userId);
  res.status(204).end();
};

export default handler;
