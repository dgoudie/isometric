import { NextApiHandler } from 'next';
import broadcastApiMutations from '../../../../../utils/broadcast-api-mutations';
import { getUserId } from '../../../../../utils/get-user-id';
import prisma from '../../../../../database/prisma';
import { reindexScheduledWorkoutExercises } from '../../../../../database/domains/scheduled_workout_exercise';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  switch (req.method) {
    case 'DELETE': {
      const { id } = req.query;
      if (typeof id !== 'string') {
        res.status(400).end();
        return;
      }
      const scheduledWorkoutForProvidedId =
        await prisma.scheduledWorkout.findFirst({
          where: {
            userId,
            exercises: {
              some: {
                id,
              },
            },
          },
        });
      if (!scheduledWorkoutForProvidedId) {
        res.status(404).end();
        return;
      }
      await prisma.scheduledWorkoutExercise.deleteMany({
        where: {
          id,
        },
      });
      await reindexScheduledWorkoutExercises(scheduledWorkoutForProvidedId.id);
      await broadcastApiMutations(userId, [
        `/api/schedule/upcoming`,
        `/api/schedule/workouts`,
        `/api/schedule/workout/${scheduledWorkoutForProvidedId.id}`,
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
