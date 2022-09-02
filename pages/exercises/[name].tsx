import { useContext, useEffect } from 'react';

import AppBarWithAppHeaderLayout from '../../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { ExerciseWithGraphData } from '../api/exercise/[name]';
import { NextPageWithLayout } from '../_app';
import RouteGuard from '../../components/RouteGuard/RouteGuard';
import RouteLoader from '../../components/RouteLoader/RouteLoader';
import { ScheduledWorkoutWithExerciseInSchedulesWithExercise } from '../../types/ScheduledWorkout';
import { SnackbarContext } from '../../providers/Snackbar/Snackbar';
import styles from './Exercise.module.scss';
import { useFetchJSONWith403Redirect } from '../../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../../utils/use-head-with-title';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Exercise: NextPageWithLayout = () => {
  const router = useRouter();

  const exerciseName = router.query.name as string;

  const fetcher = useFetchJSONWith403Redirect();

  const { openSnackbar } = useContext(SnackbarContext);

  const { data, error } = useSWR<ExerciseWithGraphData>(
    router.isReady ? `/api/exercise/${exerciseName}` : null,
    fetcher
  );

  useEffect(() => {
    if (error?.status === 404) {
      openSnackbar(`This exercise no longer exists.`);
      router.replace('/exercises');
    }
  }, [error, openSnackbar, router]);

  const head = useHeadWithTitle(exerciseName ?? 'Exercise Details');

  if (!data)
    return (
      <>
        {head}
        <RouteLoader />
      </>
    );

  return (
    <>
      <div className={styles.root}>
        {head}
        <>
          <h1>{exerciseName}</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(data.graphData, null, 4)}
          </pre>
        </>
      </div>
    </>
  );
};

Exercise.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>
    <RouteGuard>{page}</RouteGuard>
  </AppBarWithAppHeaderLayout>
);

export default Exercise;
