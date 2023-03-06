import Image from 'next/image';
import Link from 'next/link';
import { NextPageWithLayout } from '../_app';
import classNames from 'classnames';
import { signIn } from 'next-auth/react';
import styles from './Signin.module.scss';
import { useHeadWithTitle } from '../../utils/use-head-with-title';
import { useRouter } from 'next/router';

const SignIn: NextPageWithLayout = () => {
  const { query, replace } = useRouter();
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
            onClick={() =>
              signIn('google', { callbackUrl: query.callbackUrl as string })
            }
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
          <Link href={'/'} className={classNames(styles.signinButton, styles.cancel)}>

            <span>Cancel</span>

          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
