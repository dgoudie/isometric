import { signIn, signOut, useSession } from 'next-auth/react';
import { useCallback, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './ProfileBadgeAndOptions.module.scss';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
}

export default function ProfileBadgeAndOptions({ className }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  const closeDetails = useCallback(() => {
    detailsRef.current && (detailsRef.current.open = false);
  }, [detailsRef]);

  if (!session) {
    return (
      <button
        className={classNames(className, 'standard-button', styles.login)}
        onClick={() => signIn()}
      >
        Log In
      </button>
    );
  }
  return (
    <details className={classNames(styles.details, className)} ref={detailsRef}>
      <summary>
        {session.user!.name!}
        <Image
          alt={session.user!.name!}
          src={session.user!.image!}
          width={24}
          height={24}
          className={styles.profilePicture}
        />
      </summary>
      <div className={styles.detailsBody}>
        {/* <Link href='/settings'>
          <a>
            <i className='fa-solid fa-gear'></i>
            Settings
          </a>
        </Link> */}
        {router.pathname !== '/dashboard' && (
          <Link href='/dashboard'>
            <a onClick={() => closeDetails()}>
              <i className='fa-solid fa-bars-progress'></i>
              Workout Dashboard
            </a>
          </Link>
        )}
        <button
          onClick={() => {
            signOut();
            closeDetails();
          }}
        >
          <i className='fa-solid fa-right-from-bracket'></i>
          Log Out
        </button>
      </div>
    </details>
  );
}
