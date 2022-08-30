import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react';

import ActiveExerciseView from '../components/ActiveExerciseView/ActiveExerciseView';
import { ActiveWorkoutWithExercisesWithExerciseWithSetsAndDetails } from '../types/ActiveWorkout';
import EndWorkoutBottomSheet from '../components/BottomSheet/components/EndWorkoutBottomSheet/EndWorkoutBottomSheet';
import ExercisePickerBottomSheet from '../components/BottomSheet/components/ExercisePickerBottomSheet/ExercisePickerBottomSheet';
import { FullWorkout } from '../example_type';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from './_app';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import { SnackbarContext } from '../providers/Snackbar/Snackbar';
import SwipeDeadZone from '../components/SwipeDeadZone/SwipeDeadZone';
import { WorkoutContext } from '../providers/Workout/Workout';
import WorkoutExercisesBottomSheet from '../components/BottomSheet/components/WorkoutExercisesBottomSheet/WorkoutExercisesBottomSheet';
import classNames from 'classnames';
import { getActiveWorkoutId } from '../database/domains/active_workout';
import { getUserId } from '../utils/get-user-id';
import { requestNotificationPermission } from '../utils/notification';
import styles from './Workout.module.scss';
import useFetchWith403Redirect from '../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import useSWR from 'swr';

export type ActiveExercise = {
  index: number;
  scrollIntoView: boolean;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = await getUserId(context.req, context.res);
  if (!userId) {
    return { redirect: { destination: '/', permanent: false } };
  }
  const activeWorkoutId = getActiveWorkoutId(userId);
  if (!activeWorkoutId) {
    return { redirect: { destination: '/dashboard', permanent: false } };
  }
  return { props: {} };
};

const Workout: NextPageWithLayout = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const { endWorkout, discardWorkout, addExercise } =
    useContext(WorkoutContext);

  const fetcher = useFetchWith403Redirect();

  const { openSnackbar } = useContext(SnackbarContext);

  const [showEndWorkoutBottomSheet, setShowEndWorkoutBottomSheet] =
    useState(false);

  const [exerciseIndexInView, setExerciseIndexInView] = useState(0);

  const [activeExercise, setActiveExercise] = useState<ActiveExercise>({
    index: 0,
    scrollIntoView: false,
  });

  const onEndWorkoutResult = useCallback(
    (result?: 'END' | 'DISCARD') => {
      if (result === 'END') {
        endWorkout();
      } else if (result === 'DISCARD') {
        discardWorkout();
      }
      setShowEndWorkoutBottomSheet(false);
    },
    [discardWorkout, endWorkout]
  );

  const [_isPending, startTransaction] = useTransition();

  const focusedExerciseChanged = useCallback((exercise: ActiveExercise) => {
    startTransaction(() => {
      setActiveExercise(exercise);
      if (!exercise.scrollIntoView) {
        setExerciseIndexInView(exercise.index);
      }
    });
  }, []);

  const [showWorkoutExercisesBottomSheet, setShowWorkoutExercisesBottomSheet] =
    useState(false);

  const [showAddExerciseBottomSheet, setShowAddExerciseBottomSheet] =
    useState(false);

  const onExeciseSelected = useCallback((index?: number | 'add') => {
    if (typeof index === 'number') {
      setActiveExercise({ index, scrollIntoView: true });
    } else if (index === 'add') {
      setShowAddExerciseBottomSheet(true);
    }
    setShowWorkoutExercisesBottomSheet(false);
  }, []);

  const onExeciseAdded = useCallback(
    (exerciseId: string | undefined) => {
      if (typeof exerciseId !== 'undefined') {
        addExercise(exerciseId, activeExercise.index + 1);
        openSnackbar('Exercise Added.');
      }
      setShowAddExerciseBottomSheet(false);
    },
    [activeExercise.index, addExercise, openSnackbar]
  );

  const head = useHeadWithTitle('Workout');

  const { data, error } =
    useSWR<ActiveWorkoutWithExercisesWithExerciseWithSetsAndDetails>(
      '/api/workout',
      fetcher
    );

  if (error) throw error;
  if (!data) return <RouteLoader />;

  return (
    <div className={styles.root}>
      {head}
      <header className={styles.header}>
        <button
          type='button'
          onClick={() => setShowEndWorkoutBottomSheet(true)}
        >
          <i className='fa-solid fa-chevron-left'></i>
          End Workout
        </button>

        <div className={styles.headerExerciseNumber}>
          {exerciseIndexInView + 1} / {data.exercises.length}
        </div>
        <button
          type='button'
          onClick={() => setShowWorkoutExercisesBottomSheet(true)}
        >
          <i className='fa-solid fa-list-check'></i>
          Exercises
        </button>
      </header>
      <Suspense fallback={<RouteLoader className={styles.loader} />}>
        <ActiveExerciseView
          activeWorkoutExercises={data.exercises}
          focusedExercise={activeExercise}
          focusedExerciseChanged={focusedExerciseChanged}
        />
      </Suspense>
      <div className={styles.paginator}>
        {data.exercises.map((exercise, index) => (
          <div
            key={index}
            className={classNames(
              exerciseIndexInView === index && styles.active
            )}
          />
        ))}
      </div>
      <SwipeDeadZone
        className={classNames(styles.deadZone, styles.deadZoneStart)}
      />
      <SwipeDeadZone
        className={classNames(styles.deadZone, styles.deadZoneEnd)}
      />
      {showEndWorkoutBottomSheet && (
        <EndWorkoutBottomSheet onResult={onEndWorkoutResult} />
      )}
      {showWorkoutExercisesBottomSheet && (
        <WorkoutExercisesBottomSheet
          activeWorkoutExercises={data.exercises}
          onResult={onExeciseSelected}
        />
      )}
      {showAddExerciseBottomSheet && (
        <ExercisePickerBottomSheet onResult={onExeciseAdded} />
      )}
    </div>
  );
};

Workout.getLayout = (page) => <RouteGuard>{page}</RouteGuard>;

export default Workout;
