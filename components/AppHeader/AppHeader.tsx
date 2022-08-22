import Link from 'next/link';
import ProfileBadgeAndOptions from '../ProfileBadgeAndOptions/ProfileBadgeAndOptions';
import React from 'react';
import styles from './AppHeader.module.scss';

export default function AppHeader() {
  return (
    <header className={styles.topBar}>
      <Link href={'/'}>
        <a className={styles.topBarTitle} draggable='false'>
          ISOMETRIC
        </a>
      </Link>
      <ProfileBadgeAndOptions className={styles.profileBadge} />
    </header>
  );
}
