import { GetServerSidePropsContext } from 'next';
import nextAuthOptions from './next-auth-options';
import { unstable_getServerSession } from 'next-auth';

export const getUserId = async (
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res']
) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);
  if (!session) {
    return null;
  }
  return session.user!.email!;
};
