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
    case 'PUT': {
      let { id, from, to } = req.body;
      if (!(await validate(id, from, to, userId))) {
        res.status(400).end();
        return;
      }
      const scheduledWorkoutForProvidedId =
        (await prisma.scheduledWorkout.findFirst({
          where: {
            exercises: {
              some: {
                id,
              },
            },
          },
          select: {
            id: true,
          },
        }))!;
      if (from > to) {
        // move up, ex. day 2 becomes day 1
        await prisma.$executeRaw`
        update
          "ScheduledWorkoutExercise" sw
        set
          "orderNumber" = "orderNumber" + (
          select
            count(*)
          from
            "ScheduledWorkoutExercise"
          where
            "scheduledWorkoutId" = ${scheduledWorkoutForProvidedId.id})
        where
          "scheduledWorkoutId" = ${scheduledWorkoutForProvidedId.id}
          and "orderNumber" >= cast(${to} as int) 
          and "orderNumber" != cast(${from} as int)
      `;
        await reindexScheduledWorkoutExercises(
          scheduledWorkoutForProvidedId.id
        );
      } else {
        // move down, ex day 1 becomes day 2
        await prisma.$executeRaw`
          update
            "ScheduledWorkoutExercise" sw
          set
            "orderNumber" = "orderNumber" + (
            select
              count(*)
            from
              "ScheduledWorkoutExercise"
            where
              "scheduledWorkoutId" = ${scheduledWorkoutForProvidedId.id})
          where
            "scheduledWorkoutId" = ${scheduledWorkoutForProvidedId.id}
            and "orderNumber" > cast(${to} as int)
        `;
        await prisma.scheduledWorkoutExercise.update({
          where: {
            id,
          },
          data: {
            orderNumber: to + 1,
          },
        });
        await reindexScheduledWorkoutExercises(
          scheduledWorkoutForProvidedId.id
        );
      }
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

async function validate(
  id: string,
  from: number,
  to: number,
  userId: string
): Promise<boolean> {
  if (typeof id !== 'string') {
    return false;
  }
  const scheduledWorkoutForProvidedId = await prisma.scheduledWorkout.findFirst(
    {
      where: {
        userId,
        exercises: {
          some: {
            id,
          },
        },
      },
      include: {
        exercises: true,
      },
    }
  );
  if (!scheduledWorkoutForProvidedId) {
    return false;
  }
  if (typeof to !== 'number' || typeof from !== 'number') {
    return false;
  }
  if (to === from) {
    return false;
  }
  if (to >= scheduledWorkoutForProvidedId.exercises.length || to < 0) {
    return false;
  }
  if (from >= scheduledWorkoutForProvidedId.exercises.length || from < 0) {
    return false;
  }
  return true;
}
