import {
  addCheckInToActiveWorkout,
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
  const { activeWorkoutExerciseId, setIndex, complete } = req.body;
  if (typeof activeWorkoutExerciseId !== 'string') {
    res.status(400).send(`Parameter activeWorkoutExerciseId is invalid.`);
    return;
  }
  if (typeof setIndex !== 'number') {
    res.status(400).send(`Parameter set_setIndexindex is invalid.`);
    return;
  }
  if (typeof complete !== 'boolean') {
    res.status(400).send(`Parameter complete is invalid.`);
    return;
  }
  await persistSetComplete(userId, activeWorkoutExerciseId, setIndex, complete);
  await addCheckInToActiveWorkout(userId);
  // await broadcastApiMutations(userId, [`/api/workout`]);
  res.end();
};

export default handler;
