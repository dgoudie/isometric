import {
  ReplaceExerciseError,
  replaceExercise,
} from '../../../database/domains/active_workout';

import { NextApiHandler } from 'next';
import { getUserId } from '../../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const { index, newExerciseId } = req.body;
  if (typeof index !== 'number') {
    res.status(400).send(`Parameter index is invalid.`);
    return;
  }
  if (typeof newExerciseId !== 'string') {
    res.status(400).send(`Parameter newExerciseId is invalid.`);
    return;
  }
  try {
    const newActiveWorkoutExercise = await replaceExercise(
      userId,
      index,
      newExerciseId
    );
    res.send(newActiveWorkoutExercise);
  } catch (e) {
    if (e instanceof ReplaceExerciseError) {
      res.status(400).end(e);
    } else {
      throw e;
    }
  }
};

export default handler;
