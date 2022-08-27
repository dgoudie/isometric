import { NextApiHandler } from 'next';
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
      let day = await prisma.scheduledWorkout.create({
        data: {
          user: {
            connect: { userId },
          },
          orderNumber: dayCount,
          nickname: '',
        },
      });
      res.send(day.id);
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
