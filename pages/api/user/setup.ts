import { NextApiHandler } from 'next';
import { getToken } from 'next-auth/jwt';
import hashEmail from '../../../utils/hash-email';
import { initializeUserDataIfNecessary } from '../../../database/initialize-user';
import prisma from '../../../database/prisma';

const handler: NextApiHandler = async (req, res) => {
  const token = await getToken({ req });
  if (!token) {
    res.status(403).end();
    return;
  }
  const hashedEmail = hashEmail(token.email!);
  const user = await prisma.user.findUnique({
    where: { email: hashedEmail },
  });
  if (user) {
    res.end();
    return;
  }
  await initializeUserDataIfNecessary(hashedEmail);
  res.end();
};
export default handler;
