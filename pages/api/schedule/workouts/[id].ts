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
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
