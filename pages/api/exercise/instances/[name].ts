import { NextApiHandler } from 'next';
import { getUserId } from '../../../../utils/get-user-id';
import { getWorkoutInstancesByExerciseName } from '../../../../database/domains/active_workout';

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const { name, page, order } = req.query;
      if (typeof name !== 'string') {
        res.status(400).end();
        return;
      }
      if (typeof page !== 'undefined') {
        if (typeof page !== 'string' || isNaN(parseInt(page))) {
          res.status(400).end();
          return;
        }
      }
      if (typeof order !== 'undefined') {
        if (order !== 'asc' && order !== 'desc') {
          res.status(400).end();
          return;
        }
      }
      const userId = await getUserId(req, res);
      if (!userId) {
        res.status(403).end();
        return;
      }
      const instancesAndCount = await getWorkoutInstancesByExerciseName(
        userId,
        name,
        order ?? 'desc',
        !!page ? parseInt(page) : undefined
      );
      res.send(instancesAndCount);
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
