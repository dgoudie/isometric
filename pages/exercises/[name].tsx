import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';

import AppBarWithAppHeaderLayout from '../../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import ExerciseGraph from '../../components/ExerciseGraph/ExerciseGraph';
import ExerciseMetadata from '../../components/ExerciseMetadata/ExerciseMetadata';
import { ExerciseWithGraphData } from '../api/exercise/[name]';
import { FinishedWorkoutExerciseWithSets } from '../../types/FinishedWorkout';
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll';
import MuscleGroupTag from '../../components/MuscleGroupTag/MuscleGroupTag';
import { NextPageWithLayout } from '../_app';
import RouteGuard from '../../components/RouteGuard/RouteGuard';
import RouteLoader from '../../components/RouteLoader/RouteLoader';
import SetView from '../../components/SetView/SetView';
import { SnackbarContext } from '../../providers/Snackbar/Snackbar';
import { WorkoutInstancesResponse } from '../../database/domains/active_workout';
import classNames from 'classnames';
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
              <div className={classNames(styles.header, styles.chartHeader)}>
                Performance
              </div>
              <ExerciseGraph
                className={styles.rechart}
                exerciseType={data.exerciseType}
                exerciseName={data.name}
                personalBest={data.personalBest}
              />
            </div>
          )}
          <History exerciseName={exerciseName} />
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

type HistoryProps = {
  exerciseName: string;
};

const format = new Intl.DateTimeFormat('en-US');

function History({ exerciseName }: HistoryProps) {
  const [instances, setInstances] = useState<FinishedWorkoutExerciseWithSets[]>(
    []
  );
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(2);

  const fetcher = useFetchJSONWith403Redirect();
  const { data, error } = useSWR<WorkoutInstancesResponse>(
    `/api/exercise/instances/${exerciseName}?page=1`,
    fetcher
  );

  const [_pending, startTransition] = useTransition();

  useEffect(() => {
    if (!!data) {
      startTransition(() => {
        setInstances(data.instances);
        setPageCount(data.pageCount);
        setPage(2);
      });
    }
  }, [data]);

  const loadMore = useCallback(async () => {
    const nextPage: WorkoutInstancesResponse = await fetcher(
      `/api/exercise/instances/${exerciseName}?page=${page}`
    );
    setInstances([...instances!, ...nextPage.instances]);
    setPage(page + 1);
  }, [exerciseName, fetcher, instances, page]);
  if (error) throw error;

  if (!data) {
    return (
      <div className={styles.history}>
        <div>History</div>
        <RouteLoader />
      </div>
    );
  }
  return (
    <>
      <div className={styles.history}>
        <div className={styles.header}>History</div>
        {!!data.instances.length ? (
          <InfiniteScroll
            className={styles.historyItems}
            hasMore={page <= pageCount}
            loadMore={loadMore}
            pageStart={1}
            useWindow={false}
            getScrollParent={() => document.querySelector('#isometric_body')}
          >
            {instances.map((instance, index) => (
              <div className={styles.historyItemsItem} key={index}>
                <div>
                  {format.format(new Date(instance.finishedWorkout.startedAt))}
                </div>
                <SetView
                  key={index}
                  exerciseType={instance.exerciseType}
                  sets={instance.sets}
                />
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <div className={styles.noInstances}>
            <i className='fa-solid fa-circle-info'></i>
            <span>You have not performed this exercise before.</span>
          </div>
        )}
      </div>
    </>
  );
}