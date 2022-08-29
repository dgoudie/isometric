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
      let { id, nickname } = req.body;
      if (!(await validate(id, nickname, userId))) {
        res.status(400).end();
        return;
      }
      await prisma.scheduledWorkout.update({
        where: { id },
        data: {
          nickname,
        },
      });
      await broadcastApiMutations(userId, [
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

async function validate(
  id: string,
  nickname: string,
  userId: string
): Promise<boolean> {
  if (typeof id !== 'string' || typeof nickname !== 'string') {
    return false;
  }
  const scheduledWorkout = await prisma.scheduledWorkout.findFirst({
    where: {
      userId,
      id,
    },
  });
  if (!scheduledWorkout) {
    return false;
  }
  return true;
}
