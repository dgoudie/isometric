import { GetServerSidePropsContext } from 'next';
import { initializeUserDataIfNecessary } from '../database/initialize-user';
import nextAuthOptions from './next-auth-options';
import { unstable_getServerSession } from 'next-auth';

export const getUserId = async (
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res']
) => {
  let userId: string | null = null;
  // if (process.env.NODE_ENV === 'development') {
  //   userId = process.env.USER_ID ?? null;
  // }
  const session = await unstable_getServerSession(req, res, nextAuthOptions);
  if (!!session) {
    userId = session.user!.email!;
    await initializeUserDataIfNecessary(userId);
  }
  return userId;
};
