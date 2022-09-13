import {
  addCheckInToActiveWorkout,
  persistSetRepetitions,
} from '../../../database/domains/active_workout';

import { NextApiHandler } from 'next';
import { getUserId } from '../../../utils/get-user-id';

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
  await persistSetRepetitions(
    userId,
    activeWorkoutExerciseId,
    setIndex,
    repetitions
  );
  await addCheckInToActiveWorkout(userId);
  // await broadcastApiMutations(userId, [`/api/workout/active`]);
  res.end();
};

export default handler;
