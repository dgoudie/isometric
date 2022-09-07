import { NextApiHandler } from 'next';
import { initializeUserDataIfNecessary } from '../../../database/initialize-user';
import nextAuthOptions from '../../../utils/next-auth-options';
import prisma from '../../../database/prisma';
import { unstable_getServerSession } from 'next-auth';

const buildId: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);
  if (!session) {
    res.status(403).end();
    return;
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });
  if (user) {
    res.end();
    return;
  }
  await initializeUserDataIfNecessary(session.user!.email!);
  res.end();
};
export default buildId;
