import AppBarLayout from '../AppBarLayout/AppBarLayout';
import Link from 'next/link';
import styles from './AppBarWithAppHeaderLayout.module.scss';
import { useRouter } from 'next/router';

type Props = {};

export default function AppBarWithAppHeaderLayout({
  children,
}: React.PropsWithChildren<Props>) {
  const router = useRouter();
  return (
    <AppBarLayout
      header={
        <header className={styles.topBar}>
          <Link href={'/home'}>
            <a className={styles.topBarTitle} draggable='false'>
              ISOMETRIC
            </a>
          </Link>
          <Link href='/settings'>
            <a
              className={
                router.pathname === '/settings'
                  ? styles.topBarSettingsLinkActive
                  : styles.topBarSettingsLink
              }
              draggable='false'
            >
              <i className='fa-solid fa-gear'></i>
            </a>
          </Link>
        </header>
      }
    >
      {children}
    </AppBarLayout>
  );
}
