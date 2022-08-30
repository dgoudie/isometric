import { NextApiHandler } from 'next';
import { getFinishedWorkouts } from '../../database/domains/active_workout';
import { getUserId } from '../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const userId = await getUserId(req, res);
      if (!userId) {
        res.status(403).end();
        return;
      }
      const { page } = req.query;
      if (typeof page !== 'undefined') {
        if (typeof page !== 'string' || isNaN(parseInt(page))) {
          res.status(400).end();
          return;
        }
      }
      const workouts = await getFinishedWorkouts(
        userId,
        !!page ? parseInt(page) : undefined
      );
      res.send(workouts);
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
