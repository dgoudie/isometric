import { NextApiHandler } from 'next';
import { getCompletedWorkouts } from '../../database/domains/workout';
import { getUserId } from '../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const userId = getUserId(req);
      const { page } = req.query;
      if (typeof page !== 'undefined') {
        if (typeof page !== 'string' || isNaN(parseInt(page))) {
          res.status(400);
          return;
        }
      }
      const workouts = await getCompletedWorkouts(
        userId,
        !!page ? parseInt(page) : undefined
      );
      res.send(workouts);
      return;
    }
    default: {
      res.status(405);
      return;
    }
  }
};

export default handler;
