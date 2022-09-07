import {
  addCheckInToActiveWorkout,
  persistSetComplete,
  persistSetRepetitions,
} from '../../../database/domains/active_workout';
import { isNaB, parseBoolean } from '../../../utils/boolean';

import { NextApiHandler } from 'next';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import broadcastApiMutations from '../../../utils/broadcast-api-mutations';
import { getUserId } from '../../../utils/get-user-id';
import { handlePrismaConflictError } from '../../../utils/handle-prisma-conflict-error';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const { activeWorkoutExerciseId, setIndex, repetitions } = req.body;
  if (typeof activeWorkoutExerciseId !== 'string') {
    res.status(400).send(`Parameter activeWorkoutExerciseId is invalid.`);
    return;
  }
  if (typeof setIndex !== 'number') {
    res.status(400).send(`Parameter setIndex is invalid.`);
    return;
  }
  if (repetitions !== null) {
    if (typeof repetitions !== 'number' || repetitions < 0) {
      res.status(400).send(`Parameter repetitions is invalid.`);
      return;
    }
  }
  try {
    await persistSetRepetitions(
      userId,
      activeWorkoutExerciseId,
      setIndex,
      repetitions
    );
  } catch (e) {
    if (handlePrismaConflictError(e, res)) {
      return;
    }
    throw e;
  }
  await addCheckInToActiveWorkout(userId);
  // await broadcastApiMutations(userId, [`/api/workout/active`]);
  res.end();
};

export default handler;
