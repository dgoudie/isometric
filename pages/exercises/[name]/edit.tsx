import AppBarWithAppHeaderLayout from '../../../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { NextPageWithLayout } from '../../_app';
import RouteGuard from '../../../components/RouteGuard/RouteGuard';
import { useHeadWithTitle } from '../../../utils/use-head-with-title';
import { useRouter } from 'next/router';

const ExerciseEdit: NextPageWithLayout = () => {
  const router = useRouter();

  const exerciseName = router.query.name as string;

  const head = useHeadWithTitle(
    exerciseName ? `Edit ${exerciseName}` : 'Edit Exercise'
  );
  return <>{head}</>;
};

ExerciseEdit.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>
    <RouteGuard>{page}</RouteGuard>
  </AppBarWithAppHeaderLayout>
);

export default ExerciseEdit;
