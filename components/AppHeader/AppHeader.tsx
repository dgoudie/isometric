import Link from 'next/link';
import ProfileBadgeAndOptions from '../ProfileBadgeAndOptions/ProfileBadgeAndOptions';
import React from 'react';
import classNames from 'classnames';
import styles from './AppHeader.module.scss';

interface Props {
  className?: string;
}

export default function AppHeader({ className }: Props) {
  return (
    <header className={classNames(styles.topBar, className)}>
      <Link href={'/'}>
        <a className={styles.topBarTitle} draggable='false'>
          ISOMETRIC
        </a>
      </Link>
      <ProfileBadgeAndOptions className={styles.profileBadge} />
    </header>
  );
}
