import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from 'next-auth/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { BuiltInProviderType } from 'next-auth/providers';
import Image from 'next/image';
import Link from 'next/link';
import { NextPageWithLayout } from '../_app';
import classNames from 'classnames';
import { getUserId } from '../../utils/get-user-id';
import styles from './Signin.module.scss';
import { useHeadWithTitle } from '../../utils/use-head-with-title';

const format = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

type SignInProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SignInProps>> {
  const userId = await getUserId(context.req, context.res);
  if (!!userId) {
    return { redirect: { destination: '/', permanent: false } };
  }
  const providers = await getProviders();
  return { props: { providers } };
}

const SignIn: NextPageWithLayout<SignInProps> = ({ providers }) => {
  const head = useHeadWithTitle('Sign in');
  return (
    <div className={styles.root}>
      {head}
      <div className={styles.inner}>
        <div className={styles.image}>
          <Image
            width={64}
            height={64}
            src='/images/isometric.png'
            alt='ISOMETRIC'
          />
        </div>
        <h3>Sign in to ISOMETRIC</h3>
        <div className={styles.divider}></div>
        <div className={styles.signinButtons}>
          <button
            type='button'
            onClick={() => signIn('google')}
            className={styles.signinButton}
          >
            <Image
              width={18}
              height={18}
              alt='Google'
              src='/images/google.png'
            />
            <span>Sign in with Google</span>
          </button>
          <Link href={'/'}>
            <a className={classNames(styles.signinButton, styles.cancel)}>
              <span>Cancel</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

SignIn.getLayout = (page) => <>{page}</>;
