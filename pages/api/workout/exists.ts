import {
  hasActiveWorkout,
  startWorkout,
} from '../../../database/domains/active_workout';

import { NextApiHandler } from 'next';
import { getUserId } from '../../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  switch (req.method) {
    case 'GET': {
      const userHasActiveWorkout = await hasActiveWorkout(userId);
      res.send({ userHasActiveWorkout });
      return;
    }
    default: {
      res.status(405).end();
    }
  }
  res.status(204).end();
};

export default handler;
