import { formatDistance, formatDuration, intervalToDuration } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';

import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import ConfirmationBottomSheet from '../components/BottomSheet/components/ConfirmationBottomSheet/ConfirmationBottomSheet';
import { FinishedWorkoutWithExerciseWithSets } from '../types/FinishedWorkout';
import InfiniteScroll from '../components/InfiniteScroll/InfiniteScroll';
import { MdElevation } from '../components/material/MdElevation';
import { MdFilledButton } from '../components/material/MdFilledButton';
import { MdIcon } from '../components/material/MdIcon';
import { MdTextButton } from '../components/material/MdTextButton';
import MuscleGroupTag from '../components/MuscleGroupTag/MuscleGroupTag';
import { NextPageWithLayout } from './_app';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import SetView from '../components/SetView/SetView';
import classNames from 'classnames';
import { secondsToMilliseconds } from 'date-fns';
import styles from './History.module.scss';
import { useFetchJSON } from '../utils/fetch-json';
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

  const fetcher = useFetchJSON();

  const { data, error, mutate } = useSWR<FinishedWorkoutWithExerciseWithSets[]>(
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
      <Workout workout={workout} key={workout.id} reload={mutate} />
    ));
  }, [mutate, workouts]);

  const loadMore = useCallback(async () => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    const nextPage: FinishedWorkoutWithExerciseWithSets[] = await fetcher(
      `/api/workouts?${params.toString()}`
    );
    if (nextPage.length < 10) {
      setMoreWorkouts(false);
    }
    setWorkouts([...workouts!, ...nextPage]);
    setPage(page + 1);
  }, [page, fetcher, workouts]);

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
  reload: () => void;
}

function Workout({ workout, reload }: WorkoutProps) {
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

  const [confirmDeleteBottomSheetOpen, setConfirmDeleteBottomSheetOpen] =
    useState(false);

  const deleteFinishedWorkout = useCallback(
    async (result: boolean) => {
      if (result) {
        await fetch(`/api/workout/finished/${workout.id}`, {
          method: 'DELETE',
        });
        reload();
      }
      setConfirmDeleteBottomSheetOpen(false);
    },
    [reload, workout.id]
  );

  return (
    <>
      <div className={classNames(styles.workout, 'fade-in')}>
        <MdElevation />
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
        <div className={styles.workoutActions}>
          <MdTextButton
            onClick={() => setConfirmDeleteBottomSheetOpen(true)}
            className={'delete'}
          >
            <MdIcon slot='icon'>delete</MdIcon>
            Delete
          </MdTextButton>
          <MdFilledButton
            onClick={() => setOpen(!open)}
            className={classNames(
              styles.workoutActionsViewExercises,
              open && 'highlighted'
            )}
          >
            <MdIcon slot='icon'>sprint</MdIcon>
            {open ? 'Hide' : 'Show'} Exercises
          </MdFilledButton>
        </div>
        {open && <div className={styles.exercises}>{exercises}</div>}
      </div>
      {confirmDeleteBottomSheetOpen && (
        <ConfirmationBottomSheet
          prompt="Are you sure you'd like to delete this workout?"
          onResult={deleteFinishedWorkout}
        />
      )}
    </>
  );
}

export default History;

History.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>{page}</AppBarWithAppHeaderLayout>
);
