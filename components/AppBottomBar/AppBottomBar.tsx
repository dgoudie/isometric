import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import styles from './AppBottomBar.module.scss';
import { useRouter } from 'next/router';

export default function AppBottomBar() {
  return (
    <div className={styles.bottomBar}>
      <div className={styles.bottomBarInner}>
        <AppBarButton
          href='/dashboard'
          text='Dashboard'
          iconClass='fa-bars-progress'
        />
        <AppBarButton
          href='/exercises'
          text='Exercises'
          iconClass='fa-dumbbell'
        />
        <AppBarButton
          href='/history'
          text='History'
          iconClass='fa-clock-rotate-left'
        />
      </div>
    </div>
  );
}

type AppBarButtonProps = {
  href: string;
  text: string;
  iconClass: string;
};

function AppBarButton({ href, text, iconClass }: AppBarButtonProps) {
  const router = useRouter();
  return (
    <Link href={{ pathname: href, query: '' }}>
      <a
        draggable='false'
        className={classNames(router.pathname === href && styles.active)}
      >
        <i className={classNames('fa-solid', iconClass)}></i>
        {text}
      </a>
    </Link>
  );
}
