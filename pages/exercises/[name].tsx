import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { addYears, format, isBefore } from 'date-fns';
import { useCallback, useContext, useEffect, useMemo } from 'react';

import AppBarWithAppHeaderLayout from '../../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import ExerciseGraph from '../../components/ExerciseGraph/ExerciseGraph';
import ExerciseMetadata from '../../components/ExerciseMetadata/ExerciseMetadata';
import { ExerciseWithGraphData } from '../api/exercise/[name]';
import MuscleGroupTag from '../../components/MuscleGroupTag/MuscleGroupTag';
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
          <div className={styles.muscleGroups}>
            <MuscleGroupTag muscleGroup={data.primaryMuscleGroup} />
            {data.secondaryMuscleGroups.map((muscleGroup) => (
              <MuscleGroupTag key={muscleGroup} muscleGroup={muscleGroup} />
            ))}
          </div>
          <ExerciseMetadata exercise={data} className={styles.metadata} />
          {!!data.graphData.length && (
            <div className={styles.chart}>
              <div className={styles.chartHeader}>History</div>
              <div className={styles.rechart}>
                <ExerciseGraph
                  exerciseType={data.exerciseType}
                  exerciseName={data.name}
                  personalBest={data.personalBest}
                />
              </div>
            </div>
          )}
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
