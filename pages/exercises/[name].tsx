import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useContext, useEffect, useMemo } from 'react';

import AppBarWithAppHeaderLayout from '../../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { ExerciseWithGraphData } from '../api/exercise/[name]';
import { NextPageWithLayout } from '../_app';
import RouteGuard from '../../components/RouteGuard/RouteGuard';
import RouteLoader from '../../components/RouteLoader/RouteLoader';
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

  const chartData = useMemo(() => {
    if (!data?.graphData) {
      return null;
    }
    return data.graphData;
  }, [data]);

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
          <div className={styles.chart}>
            {!!chartData && (
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={chartData}>
                  <CartesianGrid horizontal={false} vertical={false} />
                  <XAxis dataKey='performedAt' hide={true} />
                  <YAxis hide={true} />
                  <Tooltip cursor={false} />
                  <Line
                    type='monotone'
                    dataKey='resistanceInPounds'
                    stroke='#8884d8'
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
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
