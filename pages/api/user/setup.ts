import { NextApiHandler } from 'next';
import { getToken } from 'next-auth/jwt';
import { initializeUserDataIfNecessary } from '../../../database/initialize-user';
import prisma from '../../../database/prisma';

const buildId: NextApiHandler = async (req, res) => {
  const token = await getToken({ req });
  if (!token) {
    res.status(403).end();
    return;
  }
  const user = await prisma.user.findUnique({
    where: { email: token.email! },
  });
  if (user) {
    res.end();
    return;
  }
  await initializeUserDataIfNecessary(token.email!);
  res.end();
};
export default buildId;
