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
    case 'GET': {
      const key = req.query.key;
      if (typeof key !== 'string') {
        res.status(400).end();
        return;
      }
      const setting = await prisma.setting.findUnique({
        where: { userId_key: { userId, key } },
      });
      if (!setting) {
        res.status(404).end();
        return;
      }
      res.send(setting.setting);
      return;
    }
    default: {
      res.status(405).end();
      return;
    }
  }
};

export default handler;
