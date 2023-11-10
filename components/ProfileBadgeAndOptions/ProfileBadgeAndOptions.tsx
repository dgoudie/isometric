import { signIn, signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef } from 'react';

import Image from 'next/image';
import { MdIcon } from '../material/MdIcon';
import { MdMenu } from '../material/MdMenu';
import { MdMenuItem } from '../material/MdMenuItem';
import { MdMenu as _MdMenu } from '@material/web/menu/menu';
import classNames from 'classnames';
import styles from './ProfileBadgeAndOptions.module.scss';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
}

export default function ProfileBadgeAndOptions({ className }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const anchorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<_MdMenu>(null);
  useEffect(() => {
    if (!!anchorRef.current && !!menuRef.current) {
      menuRef.current.anchorElement = anchorRef.current;
    }
  }, [anchorRef, menuRef]);

  if (status === 'loading' || status === 'unauthenticated' || !session) {
    return <></>;
  }
  return (
    <div className={classNames(styles.details, className)} ref={anchorRef}>
      <button className={styles.button} onClick={() => menuRef.current?.show()}>
        {session.user!.name!}
        <Image
          alt={session.user!.name!}
          src={session.user!.image!}
          width={24}
          height={24}
          className={styles.profilePicture}
        />
      </button>
      <MdMenu ref={menuRef}>
        {router.pathname !== '/dashboard' && (
          <MdMenuItem
            href='/dashboard'
            onClick={() => menuRef.current?.close()}
          >
            <MdIcon slot='leadingicon'>dashboard</MdIcon>
            <div slot='headline'>Workout Dashboard</div>
          </MdMenuItem>
        )}
        {router.pathname !== '/settings' && (
          <MdMenuItem href='/settings' onClick={() => menuRef.current?.close()}>
            <MdIcon slot='leadingicon'>settings</MdIcon>
            <div slot='headline'>User Settings</div>
          </MdMenuItem>
        )}
      </MdMenu>
      {/* <div className={styles.detailsBody}>
        {router.pathname !== '/dashboard' && (
          <Link href='/dashboard' onClick={() => closeDetails()}>
            <i className='fa-solid fa-bars-progress'></i>Workout Dashboard
          </Link>
        )}
        {router.pathname !== '/settings' && (
          <Link href='/settings' onClick={() => closeDetails()}>
            <i className='fa-solid fa-gear'></i>User Settings
          </Link>
        )}
        <button
          onClick={() => {
            signOut({ callbackUrl: '/' });
            stop();
            closeDetails();
          }}
        >
          <i className='fa-solid fa-right-from-bracket'></i>
          Log Out
        </button>
      </div> */}
    </div>
  );
}
