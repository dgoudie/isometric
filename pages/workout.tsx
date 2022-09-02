import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react';
import useSWR, { useSWRConfig } from 'swr';

import ActiveExerciseView from '../components/ActiveExerciseView/ActiveExerciseView';
import { ActiveWorkoutExerciseWithSetsAndDetails } from '../types/ActiveWorkoutExercise';
import { ActiveWorkoutWithExercisesWithExerciseWithSetsAndDetails } from '../types/ActiveWorkout';
import EndWorkoutBottomSheet from '../components/BottomSheet/components/EndWorkoutBottomSheet/EndWorkoutBottomSheet';
import ExercisePickerBottomSheet from '../components/BottomSheet/components/ExercisePickerBottomSheet/ExercisePickerBottomSheet';
import { NextPageWithLayout } from './_app';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import { SnackbarContext } from '../providers/Snackbar/Snackbar';
import SwipeDeadZone from '../components/SwipeDeadZone/SwipeDeadZone';
import { WorkoutContext } from '../providers/Workout/Workout';
import WorkoutExercisesBottomSheet from '../components/BottomSheet/components/WorkoutExercisesBottomSheet/WorkoutExercisesBottomSheet';
import classNames from 'classnames';
import equal from 'deep-equal';
import { requestNotificationPermission } from '../utils/notification';
import styles from './Workout.module.scss';
import { useFetchJSONWith403Redirect } from '../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../utils/use-head-with-title';

export type ActiveExercise = {
  index: number;
  scrollIntoView: boolean;
};

const Workout: NextPageWithLayout = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const { endWorkout, discardWorkout, addExercise } =
    useContext(WorkoutContext);

  const fetcher = useFetchJSONWith403Redirect();

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

  const head = useHeadWithTitle('Workout');

  const { data: dataUnmemoized, error } = useSWR<{
    workout: ActiveWorkoutWithExercisesWithExerciseWithSetsAndDetails;
  }>('/api/workout/active', fetcher);

  const { cache } = useSWRConfig();

  useEffect(() => {
    return () => {
      cache.delete('/api/workout/active');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [data, setData] = useState(dataUnmemoized);

  useEffect(() => {
    if (!equal(data, dataUnmemoized)) {
      setData(dataUnmemoized);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUnmemoized]);

  const activeWorkoutExercisesChanged = useCallback(
    (newActiveWorkoutExercises: ActiveWorkoutExerciseWithSetsAndDetails[]) => {
      setData({
        ...data,
        workout: {
          ...data!.workout,
          exercises: newActiveWorkoutExercises,
        },
      });
    },
    [data]
  );

  const onExeciseAdded = useCallback(
    async (exerciseId: string | undefined) => {
      if (typeof exerciseId !== 'undefined') {
        await addExercise(exerciseId, activeExercise.index + 1);
        openSnackbar('Exercise Added.');
      }
      setShowAddExerciseBottomSheet(false);
    },
    [activeExercise.index, addExercise, openSnackbar]
  );

  if (error) throw error;
  if (!data) return <RouteLoader />;

  if (!data.workout) {
    return null;
  }

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
          {exerciseIndexInView + 1} / {data.workout.exercises.length}
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
          activeWorkoutExercises={data.workout.exercises}
          activeWorkoutExercisesChanged={activeWorkoutExercisesChanged}
          focusedExercise={activeExercise}
          focusedExerciseChanged={focusedExerciseChanged}
        />
      </Suspense>
      <div className={styles.paginator}>
        {data.workout.exercises.map((exercise, index) => (
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
          activeWorkoutExercises={data.workout.exercises}
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
