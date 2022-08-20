import React, { useEffect } from 'react';

import Link from 'next/link';
import classNames from 'classnames';
import styles from './AppBarLayout.module.scss';
import { useRouter } from 'next/router';

type Props = {
  header?: React.ReactNode;
};

export default function AppBarLayout({
  children,
  header,
}: React.PropsWithChildren<Props>) {
  let body = <div className={styles.body}>{children}</div>;
  return (
    <div className={styles.root}>
      {header}
      {body}
      <div className={styles.bottomBar}>
        <div className={styles.bottomBarInner}>
          <AppBarButton href='/home' text='Home' iconClass='fa-house' />
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
