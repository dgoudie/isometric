import {
  addCheckInToActiveWorkout,
  addExercise,
} from '../../../database/domains/active_workout';

import { NextApiHandler } from 'next';
import broadcastApiMutations from '../../../utils/broadcast-api-mutations';
import { getUserId } from '../../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const { exerciseId, index } = req.body;
  if (typeof index !== 'number' || index < 0) {
    res.status(400).send(`Parameter index is invalid.`);
    return;
  }
  if (typeof exerciseId !== 'string') {
    res.status(400).send(`Parameter exerciseId is invalid.`);
    return;
  }
  await addExercise(userId, exerciseId, index);
  await addCheckInToActiveWorkout(userId);
  await broadcastApiMutations(userId, ['/api/workout/active']);
  res.end();
};

export default handler;
