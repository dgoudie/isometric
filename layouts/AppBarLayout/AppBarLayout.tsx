import React, { FormEventHandler, useCallback, useMemo, useRef } from 'react';

import Link from 'next/link';
import { MdIcon } from '../../components/material/MdIcon';
import { MdNavigationBar } from '../../components/material/MdNavigationBar';
import { MdNavigationTab } from '../../components/material/MdNavigationTab';
import { MdPrimaryTab } from '../../components/material/MdPrimaryTab';
import { MdTabs } from '../../components/material/MdTabs';
import { MdTabs as _MdTabs } from '@material/web/tabs/tabs';
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
  let body = (
    <div className={styles.body} id='isometric_body'>
      {children}
    </div>
  );
  const router = useRouter();
  const selectedIndex = useMemo(() => {
    let selectedIndex = undefined;
    switch (router.pathname) {
      case '/dashboard':
        selectedIndex = 0;
        break;
      case '/exercises':
        selectedIndex = 1;
        break;
      case '/history':
        selectedIndex = 2;
        break;
    }
    return selectedIndex;
  }, [router.pathname]);

  const onChange = useCallback(
    (event: Event) => {
      const selectedIndex = (event.target as _MdTabs).activeTabIndex;
      switch (selectedIndex) {
        case 0:
          router.replace('/dashboard');
          break;
        case 1:
          router.replace('/exercises');
          break;
        case 2:
          router.replace('/history');
          break;
      }
    },
    [router]
  );

  return (
    <div className={styles.root}>
      {header}
      {body}
      <div className={styles.bottomBar}>
        <MdTabs
          className={styles.bottomBarInner}
          activeTabIndex={selectedIndex}
          onChange={onChange}
        >
          <MdPrimaryTab>
            Dashboard
            <MdIcon slot='icon'>dashboard</MdIcon>
          </MdPrimaryTab>
          <MdPrimaryTab>
            Exercises
            <MdIcon slot='icon'>exercise</MdIcon>
          </MdPrimaryTab>
          <MdPrimaryTab>
            History
            <MdIcon slot='icon'>history</MdIcon>
          </MdPrimaryTab>
        </MdTabs>
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
    <Link
      href={{ pathname: href, query: '' }}
      draggable='false'
      className={classNames(router.pathname === href && styles.active)}
    >
      <i className={classNames('fa-solid', iconClass)}></i>
      {text}
    </Link>
  );
}
