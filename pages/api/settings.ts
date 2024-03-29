import { NextApiHandler } from 'next';
import { getUserId } from '../../utils/get-user-id';
import prisma from '../../database/prisma';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  switch (req.method) {
    case 'GET': {
      const settings = await prisma.setting.findMany({
        where: { userId },
      });
      res.send(settings);
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
