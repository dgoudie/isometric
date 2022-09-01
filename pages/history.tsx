import { formatDistance, formatDuration, intervalToDuration } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';

import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { FinishedWorkoutWithExerciseWithSets } from '../types/FinishedWorkout';
import InfiniteScroll from '../components/InfiniteScroll/InfiniteScroll';
import MuscleGroupTag from '../components/MuscleGroupTag/MuscleGroupTag';
import { NextPageWithLayout } from './_app';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import SetView from '../components/SetView/SetView';
import classNames from 'classnames';
import { fetchFromApi } from '../utils/fetch-from-api';
import { getFinishedWorkouts } from '../database/domains/active_workout';
import { secondsToMilliseconds } from 'date-fns';
import styles from './History.module.scss';
import { useFetchJSONWith403Redirect } from '../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import useSWR from 'swr';

const format = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const History: NextPageWithLayout = ({}) => {
  const [workouts, setWorkouts] = useState<
    FinishedWorkoutWithExerciseWithSets[]
  >([]);
  const [moreWorkouts, setMoreWorkouts] = useState(false);
  const [page, setPage] = useState(2);

  const fetcher = useFetchJSONWith403Redirect();

  const { data, error } = useSWR<FinishedWorkoutWithExerciseWithSets[]>(
    '/api/workouts?page=1',
    fetcher
  );

  useEffect(() => {
    if (!!data) {
      setWorkouts(data);
      setMoreWorkouts(data.length === 10);
      setPage(2);
    }
  }, [data]);

  const items = useMemo(() => {
    return workouts?.map((workout) => (
      <Workout workout={workout} key={workout.id} />
    ));
  }, [workouts]);

  const loadMore = useCallback(async () => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    const nextPage = await fetchFromApi<
      Awaited<ReturnType<typeof getFinishedWorkouts>>
    >(`/api/workouts`, params);
    if (nextPage.length < 10) {
      setMoreWorkouts(false);
    }
    setWorkouts([...workouts!, ...nextPage]);
    setPage(page + 1);
  }, [workouts, page]);

  const head = useHeadWithTitle('Workout History');

  if (error) throw error;
  if (!data) return <RouteLoader />;

  return (
    <div className={styles.root}>
      {head}
      <h1>Workout History</h1>
      {!!items.length ? (
        <div className={styles.workouts}>
          <InfiniteScroll
            className={styles.workoutsInner}
            pageStart={1}
            loadMore={loadMore}
            hasMore={moreWorkouts}
            useWindow={false}
          >
            {items}
          </InfiniteScroll>
        </div>
      ) : (
        <div className={classNames(styles.noHistory, 'fade-in')}>
          Completed workouts will show up here. You haven&apos;t completed any
          workouts yet.
        </div>
      )}
    </div>
  );
};

interface WorkoutProps {
  workout: FinishedWorkoutWithExerciseWithSets;
}

function Workout({ workout }: WorkoutProps) {
  const howLongAgo = useMemo(
    () =>
      formatDistance(new Date(workout.startedAt), new Date(), {
        addSuffix: true,
      }),
    [workout]
  );
  const duration = useMemo(() => {
    if (workout.durationInSeconds! < 60) {
      return `${workout.durationInSeconds!} seconds`;
    } else {
      return formatDuration(
        intervalToDuration({
          start: 0,
          end: secondsToMilliseconds(workout.durationInSeconds!),
        }),
        { format: ['hours', 'minutes'] }
      );
    }
  }, [workout]);

  const exercises = useMemo(
    () =>
      workout.exercises.map((exercise, index) => {
        return (
          <div key={index} className={styles.exercise}>
            <div className={styles.exerciseHeader}>
              <div>{exercise.name}</div>
              <MuscleGroupTag muscleGroup={exercise.primaryMuscleGroup} />
            </div>
            <SetView
              exerciseType={exercise.exerciseType}
              sets={exercise.sets}
            />
          </div>
        );
      }),
    [workout]
  );

  const [open, setOpen] = useState(false);

  return (
    <div className={classNames(styles.workout, 'fade-in')}>
      <div className={styles.item}>
        <div className={styles.header}>{workout.nickname}</div>
      </div>
      <div className={styles.item}>
        <label>Date</label>
        <div>{format.format(new Date(workout.startedAt))}</div>
        <div className={styles.suffix}>{howLongAgo}</div>
      </div>
      <div className={styles.item}>
        <label>Duration</label>
        <div>{duration}</div>
      </div>
      <details
        onToggle={(event) => setOpen((event.target as HTMLDetailsElement).open)}
      >
        <summary
          className={classNames(
            'standard-button outlined',
            open && 'highlighted'
          )}
        >
          <i className='fa-solid fa-person-walking'></i>
          <span>{open ? 'Hide' : 'Show'} Exercises</span>
        </summary>
        <div className={styles.exercises}>{exercises}</div>
      </details>
    </div>
  );
}

export default History;

History.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>
    <RouteGuard>{page}</RouteGuard>
  </AppBarWithAppHeaderLayout>
);
