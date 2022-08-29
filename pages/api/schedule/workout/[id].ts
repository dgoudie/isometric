import { NextApiHandler } from 'next';
import broadcastApiMutations from '../../../../utils/broadcast-api-mutations';
import { getUserId } from '../../../../utils/get-user-id';
import prisma from '../../../../database/prisma';
import { reindexScheduledWorkouts } from '../../../../database/domains/schedule';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  switch (req.method) {
    case 'GET': {
      const id = req.query.id;
      if (typeof id !== 'string') {
        res.status(400).end();
        return;
      }
      let day = await prisma.scheduledWorkout.findFirst({
        where: {
          id,
          userId,
        },
        include: {
          exercises: {
            include: {
              exercise: true,
            },
          },
        },
      });
      if (!day) {
        res.status(404).end();
        return;
      }
      res.send(day);
      return;
    }
    case 'DELETE': {
      const id = req.query.id;
      if (typeof id !== 'string') {
        res.status(400).end();
        return;
      }
      await prisma.scheduledWorkout.deleteMany({
        where: {
          id,
          userId,
        },
      });
      await reindexScheduledWorkouts(userId);
      broadcastApiMutations(userId, [
        `/api/schedule/workouts`,
        `/api/schedule/workout/${id}`,
      ]);
      res.status(204).end();
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
