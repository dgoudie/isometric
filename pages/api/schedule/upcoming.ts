import { NextApiHandler } from 'next';
import { getNextDaySchedule } from '../../../database/domains/scheduled_workout';
import { getUserId } from '../../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  switch (req.method) {
    case 'GET': {
      let day = await getNextDaySchedule(userId);
      res.send(day);
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
