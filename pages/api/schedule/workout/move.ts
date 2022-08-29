import { NextApiHandler } from 'next';
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
    case 'PUT': {
      let { id, from, to } = req.body;
      if (!(await validate(id, from, to, userId))) {
        res.status(400).end();
        return;
      }
      if (from > to) {
        // move up, ex. day 2 becomes day 1
        await prisma.$executeRaw`
        update
          "ScheduledWorkout" sw
        set
          "orderNumber" = "orderNumber" + (
          select
            count(*)
          from
            "ScheduledWorkout"
          where
            "userId" = ${userId})
        where
          "userId" = ${userId}
          and "orderNumber" >= cast(${to} as int) 
          and "orderNumber" != cast(${from} as int)
      `;
        await reindexScheduledWorkouts(userId);
      } else {
        // move down, ex day 1 becomes day 2
        await prisma.$executeRaw`
          update
            "ScheduledWorkout" sw
          set
            "orderNumber" = "orderNumber" + (
            select
              count(*)
            from
              "ScheduledWorkout"
            where
              "userId" = ${userId})
          where
            "userId" = ${userId}
            and "orderNumber" > cast(${to} as int)
        `;
        await prisma.scheduledWorkout.update({
          where: {
            id,
          },
          data: {
            orderNumber: to + 1,
          },
        });
        await reindexScheduledWorkouts(userId);
      }
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
  const scheduledWorkoutsForUser = await prisma.scheduledWorkout.findMany({
    where: {
      userId,
    },
  });
  if (!scheduledWorkoutsForUser.find((sw) => sw.id === id)) {
    return false;
  }
  if (typeof to !== 'number' || typeof from !== 'number') {
    return false;
  }
  if (to === from) {
    return false;
  }
  if (to >= scheduledWorkoutsForUser.length || to < 0) {
    return false;
  }
  if (from >= scheduledWorkoutsForUser.length || from < 0) {
    return false;
  }
  return true;
}
