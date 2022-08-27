import AppBarWithAppHeaderLayout from '../../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { NextPageWithLayout } from '../_app';
import RouteGuard from '../../components/RouteGuard/RouteGuard';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const ScheduleDay: NextPageWithLayout = () => {
  const router = useRouter();

  const dayId = router.query.id as string;

  const day = useSWR(`/api/schedule/workout/${dayId}`);

  return <div></div>;
};

ScheduleDay.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>
    <RouteGuard>{page}</RouteGuard>
  </AppBarWithAppHeaderLayout>
);

export default ScheduleDay;
