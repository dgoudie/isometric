import { NextApiHandler } from 'next';
import { getUserId } from '../../../utils/get-user-id';
import prisma from '../../../database/prisma';

const subscribe: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const subscriptionBase64Encoded = req.body;
  await prisma.user.update({
    where: { userId },
    data: { pushNotificationSubscription: subscriptionBase64Encoded },
  });
  res.end();
};
export default subscribe;
