import { NextApiHandler } from 'next';
import broadcastApiMutations from '../../../../utils/broadcast-api-mutations';
import { getUserId } from '../../../../utils/get-user-id';
import { startWorkout } from '../../../../database/domains/active_workout';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const { day } = req.query;
  if (typeof day !== 'string' || isNaN(parseInt(day)) || parseInt(day) < 1) {
    res.status(400).send(`Parameter day is invalid.`);
    return;
  }
  await startWorkout(userId, parseInt(day));
  await broadcastApiMutations(userId, ['/api/workout/exists']);
  res.status(204).end();
};

export default handler;
