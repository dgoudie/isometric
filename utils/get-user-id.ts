import { GetServerSidePropsContext } from 'next';
import nextAuthOptions from './next-auth-options';
import prisma from '../database/prisma';
import { unstable_getServerSession } from 'next-auth';

export const getUserId = async (
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res']
) => {
  let userId: string | null = null;
  const session = await unstable_getServerSession(req, res, nextAuthOptions);
  if (!!session) {
    const user = await prisma.user.findUnique({
      where: { email: session.user!.email! },
    });
    userId = user!.userId;
  }
  return userId;
};
