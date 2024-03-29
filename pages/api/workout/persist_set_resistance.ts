import {
  addCheckInToActiveWorkout,
  persistSetResistance,
} from '../../../database/domains/active_workout';

import { NextApiHandler } from 'next';
import { getUserId } from '../../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const { activeWorkoutExerciseId, setIndex, resistanceInPounds } = req.body;
  if (typeof activeWorkoutExerciseId !== 'string') {
    res.status(400).send(`Parameter activeWorkoutExerciseId is invalid.`);
    return;
  }
  if (typeof setIndex !== 'number') {
    res.status(400).send(`Parameter setIndex is invalid.`);
    return;
  }
  if (resistanceInPounds !== null && typeof resistanceInPounds !== 'number') {
    res.status(400).send(`Parameter resistanceInPounds is invalid.`);
    return;
  }

  await persistSetResistance(
    userId,
    activeWorkoutExerciseId,
    setIndex,
    resistanceInPounds
  );
  await addCheckInToActiveWorkout(userId);
  // await broadcastApiMutations(userId, [`/api/workout/active`]);
  res.end();
};

export default handler;
