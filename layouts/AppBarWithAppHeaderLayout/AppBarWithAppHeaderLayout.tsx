import AppBarLayout from '../AppBarLayout/AppBarLayout';
import AppHeader from '../../components/AppHeader/AppHeader';
import styles from './AppBarWithAppHeaderLayout.module.scss';

type Props = {
  hideProfileBadge?: boolean;
};

export default function AppBarWithAppHeaderLayout({
  children,
  hideProfileBadge,
}: React.PropsWithChildren<Props>) {
  return (
    <AppBarLayout
      header={
        <AppHeader
          hideProfileBadge={hideProfileBadge}
          className={styles.topBar}
        />
      }
    >
      {children}
    </AppBarLayout>
  );
}
