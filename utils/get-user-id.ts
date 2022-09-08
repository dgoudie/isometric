import { GetServerSidePropsContext } from 'next';
import { getToken } from 'next-auth/jwt';
import hashEmail from './hash-email';
import prisma from '../database/prisma';

export const getUserId = async (
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res']
) => {
  let userId: string | null = null;
  const token = await getToken({ req });
  if (!!token) {
    const user = await prisma.user.findUnique({
      where: { email: hashEmail(token.email!) },
    });
    userId = user?.userId ?? null;
  }
  return userId;
};
