import { isNaB, parseBoolean } from '../../../utils/boolean';

import { NextApiHandler } from 'next';
import { getUserId } from '../../../utils/get-user-id';
import { persistSetComplete } from '../../../database/domains/workout';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const { exercise_index, set_index, complete } = req.query;
  if (typeof exercise_index !== 'string' || isNaN(parseInt(exercise_index))) {
    res.status(400).send(`Parameter exercise_index is invalid.`);
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
    parseInt(exercise_index),
    parseInt(set_index),
    parseBoolean(complete)!
  );
  res.end();
};

export default handler;
