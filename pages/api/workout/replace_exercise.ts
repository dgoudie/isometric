import {
  ReplaceExerciseError,
  addCheckInToActiveWorkout,
  replaceExercise,
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
  const { activeWorkoutExerciseId, newExerciseId } = req.body;
  if (typeof activeWorkoutExerciseId !== 'string') {
    res.status(400).send(`Parameter activeWorkoutExerciseId is invalid.`);
    return;
  }
  if (typeof newExerciseId !== 'string') {
    res.status(400).send(`Parameter newExerciseId is invalid.`);
    return;
  }
  try {
    await replaceExercise(userId, activeWorkoutExerciseId, newExerciseId);
    await addCheckInToActiveWorkout(userId);
    await broadcastApiMutations(userId, ['/api/workout/active']);
    res.end();
  } catch (e) {
    if (e instanceof ReplaceExerciseError) {
      res.status(400).end(e);
    } else {
      throw e;
    }
  }
};

export default handler;
