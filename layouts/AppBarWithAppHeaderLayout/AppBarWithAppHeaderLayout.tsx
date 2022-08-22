import AppBarLayout from '../AppBarLayout/AppBarLayout';
import AppHeader from '../../components/AppHeader/AppHeader';
import styles from './AppBarWithAppHeaderLayout.module.scss';
type Props = {};

export default function AppBarWithAppHeaderLayout({
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <AppBarLayout header={<AppHeader className={styles.topBar} />}>
      {children}
    </AppBarLayout>
  );
}
