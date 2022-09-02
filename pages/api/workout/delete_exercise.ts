import {
  DeleteExerciseError,
  addCheckInToActiveWorkout,
  deleteExercise,
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
  const { activeWorkoutExerciseId } = req.body;
  if (typeof activeWorkoutExerciseId !== 'string') {
    res.status(400).send(`Parameter activeWorkoutExerciseId is invalid.`);
    return;
  }
  try {
    await deleteExercise(userId, activeWorkoutExerciseId);
    await addCheckInToActiveWorkout(userId);
    await broadcastApiMutations(userId, ['/api/workout/active']);
    res.end();
  } catch (e) {
    if (e instanceof DeleteExerciseError) {
      res.status(400).end(e);
    } else {
      throw e;
    }
  }
};

export default handler;
