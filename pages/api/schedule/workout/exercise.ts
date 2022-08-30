import { NextApiHandler } from 'next';
import broadcastApiMutations from '../../../../utils/broadcast-api-mutations';
import { getUserId } from '../../../../utils/get-user-id';
import prisma from '../../../../database/prisma';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  switch (req.method) {
    case 'PUT': {
      const { exerciseId, scheduledWorkoutId } = req.body;
      if (!(await validate(userId, exerciseId, scheduledWorkoutId))) {
        res.status(400).end();
        return;
      }
      let orderNumber = 0;
      const orderNumberItem = await prisma.scheduledWorkoutExercise.findFirst({
        where: {
          scheduledWorkoutId,
        },
        orderBy: {
          orderNumber: 'desc',
        },
      });
      if (!!orderNumberItem) {
        orderNumber = orderNumberItem.orderNumber + 1;
      }
      const newExercise = await prisma.scheduledWorkoutExercise.create({
        data: {
          scheduledWorkoutId,
          exerciseId,
          orderNumber,
        },
      });
      await broadcastApiMutations(userId, [
        `/api/schedule/upcoming`,
        `/api/schedule/workouts`,
        `/api/schedule/workout/${scheduledWorkoutId}`,
      ]);
      res.status(200).send(newExercise.id);
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;

async function validate(
  userId: string,
  exerciseId: string,
  scheduledWorkoutId: string
) {
  if (
    typeof exerciseId !== 'string' ||
    typeof scheduledWorkoutId !== 'string'
  ) {
    return false;
  }
  const scheduledWorkout = prisma.scheduledWorkout.findFirst({
    where: {
      userId,
      id: scheduledWorkoutId,
    },
    select: {
      id: true,
    },
  });
  if (!scheduledWorkout) {
    return false;
  }
  const exercise = prisma.exercise.findFirst({
    where: {
      userId,
      id: exerciseId,
    },
    select: {
      id: true,
    },
  });
  if (!exercise) {
    return false;
  }
  return true;
}
