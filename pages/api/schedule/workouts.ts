import { NextApiHandler } from 'next';
import { ScheduledWorkoutWithExerciseInSchedulesWithExercise } from '../../../types/ScheduledWorkout';
import { getUserId } from '../../../utils/get-user-id';
import prisma from '../../../database/prisma';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  switch (req.method) {
    case 'GET': {
      const days: ScheduledWorkoutWithExerciseInSchedulesWithExercise[] =
        await prisma.scheduledWorkout.findMany({
          where: { userId },
          include: {
            exercises: {
              include: { exercise: true },
              orderBy: {
                orderNumber: 'asc',
              },
            },
          },
          orderBy: {
            orderNumber: 'asc',
          },
        });
      res.send(days);
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
