import { NextApiHandler } from 'next';
import { getUserId } from '../../../utils/get-user-id';
import prisma from '../../../database/prisma';
import themes from '../../../utils/themes';

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
    case 'PUT': {
      const key = req.query.key;
      if (typeof key !== 'string') {
        res.status(400).end();
        return;
      }
      const setting = req.body;
      if (typeof setting !== 'object') {
        res.status(415).end();
        return;
      }
      const value = validateThemeAndGetValue(setting);
      if (!value) {
        res.status(400).end();
        return;
      }
      await prisma.setting.update({
        where: {
          userId_key: {
            userId,
            key,
          },
        },
        data: {
          setting: {
            key,
            value,
          },
        },
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

const validateThemeAndGetValue = (setting: { value: string }) => {
  if (!setting?.value) {
    return null;
  }
  if (themes.has(setting.value)) {
    return setting.value;
  }
  return null;
};
