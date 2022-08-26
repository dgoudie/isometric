import {
  createSchedule,
  getSchedule,
  saveSchedule,
} from '../../database/domains/schedule';

import { DayWithExerciseIds } from '../../components/WorkoutPlanEditor/WorkoutPlanEditor';
import { NextApiHandler } from 'next';
import { getUserId } from '../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  switch (req.method) {
    case 'GET': {
      let schedule = await getSchedule(userId);
      if (!schedule) {
        await createSchedule(userId);
        schedule = await getSchedule(userId);
      }
      res.send(schedule);
      return;
    }
    case 'PUT': {
      await saveSchedule(userId, req.body);
      res.end();
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
