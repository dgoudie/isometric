import { isNaB, parseBoolean } from '../../../utils/boolean';

import { NextApiHandler } from 'next';
import broadcastApiMutations from '../../../utils/broadcast-api-mutations';
import { getUserId } from '../../../utils/get-user-id';
import { persistSetComplete } from '../../../database/domains/active_workout';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const { active_workout_exercise_id, set_index, complete } = req.query;
  if (typeof active_workout_exercise_id !== 'string') {
    res.status(400).send(`Parameter active_workout_exercise_id is invalid.`);
    return;
  }
  if (typeof set_index !== 'string' || isNaN(parseInt(set_index))) {
    res.status(400).send(`Parameter set_index is invalid.`);
    return;
  }
  if (typeof complete !== 'string' || isNaB(parseBoolean(complete))) {
    res.status(400).send(`Parameter complete is invalid.`);
    return;
  }
  await persistSetComplete(
    userId,
    active_workout_exercise_id,
    parseInt(set_index),
    parseBoolean(complete)!
  );
  broadcastApiMutations(userId, [`/api/workout`]);
  res.end();
};

export default handler;
