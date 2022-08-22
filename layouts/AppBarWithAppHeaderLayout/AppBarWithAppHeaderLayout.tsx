import AppBarLayout from '../AppBarLayout/AppBarLayout';
import AppHeader from '../../components/AppHeader/AppHeader';

type Props = {};

export default function AppBarWithAppHeaderLayout({
  children,
}: React.PropsWithChildren<Props>) {
  return <AppBarLayout header={<AppHeader />}>{children}</AppBarLayout>;
}
