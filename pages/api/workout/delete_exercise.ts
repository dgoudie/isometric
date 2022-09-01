import {
  deleteExercise,
  persistSetComplete,
} from '../../../database/domains/active_workout';
import { isNaB, parseBoolean } from '../../../utils/boolean';

import { NextApiHandler } from 'next';
import broadcastApiMutations from '../../../utils/broadcast-api-mutations';
import { getUserId } from '../../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const { index } = req.body;
  if (typeof index !== 'number') {
    res.status(400).send(`Parameter index is invalid.`);
    return;
  }
  await deleteExercise(userId, index);
  // await broadcastApiMutations(userId, [`/api/workout`]);
  res.end();
};

export default handler;
