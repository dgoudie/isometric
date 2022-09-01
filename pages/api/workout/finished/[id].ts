import { NextApiHandler } from 'next';
import { getUserId } from '../../../../utils/get-user-id';
import prisma from '../../../../database/prisma';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const { id } = req.query;
  if (typeof id !== 'string') {
    res.status(400).end();
  }
  switch (req.method) {
    case 'DELETE': {
      await prisma.finishedWorkout.deleteMany({
        where: {
          id: id as string,
          userId,
        },
      });
      res.status(204).end();
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
