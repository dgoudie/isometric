import { NextApiHandler } from 'next';
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
      let scheduledWorkoutIds: string[] = req.body.scheduledWorkoutIds;
      if (!(await validate(scheduledWorkoutIds, userId))) {
        res.status(400).end();
        return;
      }
      await prisma.$transaction(async () => {
        // increment every item by the total count. This is to avoid unique constraint.
        // order numbers 0,1,2 will become 3,4,5
        await prisma.scheduledWorkout.updateMany({
          where: {
            userId,
          },
          data: {
            orderNumber: {
              increment: scheduledWorkoutIds.length,
            },
          },
        });
        for (let i = 0; i < scheduledWorkoutIds.length; i++) {
          const id = scheduledWorkoutIds[i];
          await prisma.scheduledWorkout.update({
            where: {
              id,
            },
            data: {
              orderNumber: i,
            },
          });
        }
      });
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
  scheduledWorkoutIds: string[],
  userId: string
): Promise<boolean> {
  if (!Array.isArray(scheduledWorkoutIds)) {
    return false;
  }
  if (
    !Object.values(scheduledWorkoutIds).every((id) => typeof id === 'string')
  ) {
    return false;
  }
  const matchingCount = await prisma.scheduledWorkout.count({
    where: {
      userId,
      id: {
        in: scheduledWorkoutIds,
      },
    },
  });
  if (matchingCount !== scheduledWorkoutIds.length) {
    return false;
  }
  return true;
}
