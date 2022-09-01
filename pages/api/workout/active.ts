import { NextApiHandler } from 'next';
import { getFullActiveWorkout } from '../../../database/domains/active_workout';
import { getUserId } from '../../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const workout = await getFullActiveWorkout(userId);
  res.send({ workout });
};

export default handler;
