import { NextApiHandler } from 'next';
import broadcastApiMutations from '../../../utils/broadcast-api-mutations';
import { getUserId } from '../../../utils/get-user-id';
import prisma from '../../../database/prisma';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  switch (req.method) {
    case 'PUT': {
      let dayCount = await prisma.scheduledWorkout.count({
        where: { userId },
      });
      const id = req.query.copy;
      if (typeof id === 'string') {
        const dayToCopy = await prisma.scheduledWorkout.findFirst({
          where: { userId, id },
          include: {
            exercises: {
              include: {
                exercise: true,
              },
              orderBy: {
                orderNumber: 'asc',
              },
            },
          },
        });
        if (!dayToCopy) {
          res.status(404).end();
          return;
        }
        let day = await prisma.scheduledWorkout.create({
          data: {
            user: {
              connect: { userId },
            },
            orderNumber: dayCount,
            nickname: dayToCopy.nickname,
          },
        });
        await prisma.scheduledWorkoutExercise.createMany({
          data: dayToCopy.exercises.map((scheduledWorkoutExercise, index) => ({
            scheduledWorkoutId: day.id,
            orderNumber: index,
            exerciseId: scheduledWorkoutExercise.exerciseId,
          })),
        });
        await broadcastApiMutations(userId, [`/api/schedule/workouts`]);
        res.send(day.id);
      } else {
        let day = await prisma.scheduledWorkout.create({
          data: {
            user: {
              connect: { userId },
            },
            orderNumber: dayCount,
            nickname: '',
          },
        });
        await broadcastApiMutations(userId, [`/api/schedule/workouts`]);
        res.send(day.id);
      }
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
