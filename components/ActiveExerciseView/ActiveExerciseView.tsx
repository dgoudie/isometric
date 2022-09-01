import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { ActiveExercise } from '../../pages/workout';
import ActiveExerciseViewExercise from '../ActiveExerciseViewExercise/ActiveExerciseViewExercise';
import { ActiveWorkoutExerciseWithSetsAndDetails } from '../../types/ActiveWorkoutExercise';
import { AfterExerciseTimerContext } from '../../providers/AfterExerciseTimer/AfterExerciseTimer';
import classNames from 'classnames';
import equal from 'deep-equal';
import styles from './ActiveExerciseView.module.scss';
import { usePageVisibility } from 'react-page-visibility';

interface Props {
  activeWorkoutExercises: ActiveWorkoutExerciseWithSetsAndDetails[];
  activeWorkoutExercisesChanged: (
    activeWorkoutExercises: ActiveWorkoutExerciseWithSetsAndDetails[]
  ) => void;
  focusedExercise: ActiveExercise;
  focusedExerciseChanged: (exercise: ActiveExercise) => void;
}
export default function ActiveExerciseView({
  activeWorkoutExercises: activeWorkoutExercisesUnmemoized,
  activeWorkoutExercisesChanged,
  focusedExercise,
  focusedExerciseChanged,
}: Props) {
  const [activeWorkoutExercises, setActiveWorkoutExercises] = useState(
    activeWorkoutExercisesUnmemoized
  );

  useEffect(() => {
    if (!equal(activeWorkoutExercises, activeWorkoutExercisesUnmemoized)) {
      setActiveWorkoutExercises(activeWorkoutExercisesUnmemoized);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWorkoutExercisesUnmemoized]);

  const rootRef = useRef<HTMLDivElement>(null);
  const scrollExerciseIntoViewByIndex = useCallback(
    (index: number) => {
      rootRef.current?.children &&
        rootRef.current?.children[index]?.scrollIntoView({
          behavior: 'smooth',
        });
    },
    [rootRef]
  );

  const [
    queuedExerciseIndexToScrollIntoView,
    setQueuedExerciseIndexToScrollIntoView,
  ] = useState<number | undefined>(undefined);

  const pageVisible = usePageVisibility();

  useEffect(() => {
    !!focusedExercise.scrollIntoView &&
      setQueuedExerciseIndexToScrollIntoView(focusedExercise.index);
  }, [focusedExercise, setQueuedExerciseIndexToScrollIntoView]);

  useEffect(() => {
    if (
      pageVisible &&
      typeof queuedExerciseIndexToScrollIntoView !== 'undefined'
    ) {
      scrollExerciseIntoViewByIndex(queuedExerciseIndexToScrollIntoView);
      setQueuedExerciseIndexToScrollIntoView(undefined);
    }
  }, [
    scrollExerciseIntoViewByIndex,
    setQueuedExerciseIndexToScrollIntoView,
    pageVisible,
    queuedExerciseIndexToScrollIntoView,
  ]);

  const scrolledIntoView = useCallback(
    (index: number) => {
      focusedExerciseChanged({ index, scrollIntoView: false });
    },
    [focusedExerciseChanged]
  );

  const activeWorkoutExerciseChanged = useCallback(
    (activeWorkoutExercise: ActiveWorkoutExerciseWithSetsAndDetails) => {
      const newActiveWorkoutExercises = activeWorkoutExercises.map(
        (previous, i) =>
          i === activeWorkoutExercise.orderNumber
            ? activeWorkoutExercise
            : previous
      );
      setActiveWorkoutExercises(newActiveWorkoutExercises);
      activeWorkoutExercisesChanged(newActiveWorkoutExercises);
    },
    [activeWorkoutExercises, activeWorkoutExercisesChanged]
  );

  const activeWorkoutExerciseDeleted = useCallback(
    (index: number) => {
      const newActiveWorkoutExercises = activeWorkoutExercises
        .filter((_, i) => i !== index)
        .map((awe, i) => ({ ...awe, orderNumber: i }));
      setActiveWorkoutExercises(newActiveWorkoutExercises);
      activeWorkoutExercisesChanged(newActiveWorkoutExercises);
    },
    [activeWorkoutExercises, activeWorkoutExercisesChanged]
  );

  const {
    isOpenAndMinimized: timerIsOpenAndMinimized,
    cancel,
    showAfterLastSet,
    showAfterLastExercise,
  } = useContext(AfterExerciseTimerContext);

  const getNextNonCompleteExercise = useCallback(
    (idToIgnore: string) => {
      return activeWorkoutExercises.find(
        (exercise) =>
          exercise.id !== idToIgnore &&
          !exercise.sets.every((set) => set.complete)
      );
    },
    [activeWorkoutExercises]
  );

  const focusNextExercise = useCallback(
    (idToIgnore: string) => {
      const nextNonCompleteExercise = getNextNonCompleteExercise(idToIgnore);
      !!nextNonCompleteExercise &&
        focusedExerciseChanged({
          index: nextNonCompleteExercise.orderNumber,
          scrollIntoView: true,
        });
    },
    [focusedExerciseChanged, getNextNonCompleteExercise]
  );

  const onCompleted = useCallback(
    (activeWorkoutExercise: ActiveWorkoutExerciseWithSetsAndDetails) => {
      let nextNonCompleteExercise = activeWorkoutExercises.find(
        (exercise) =>
          exercise.id !== activeWorkoutExercise.id &&
          !exercise.sets.every((set) => set.complete)
      );
      if (!!nextNonCompleteExercise) {
        showAfterLastSet(
          nextNonCompleteExercise.exercise.name,
          nextNonCompleteExercise.exercise.primaryMuscleGroup,
          () => focusNextExercise(activeWorkoutExercise.id)
        );
      } else {
        showAfterLastExercise();
      }
      activeWorkoutExerciseChanged(activeWorkoutExercise);
    },
    [
      activeWorkoutExerciseChanged,
      activeWorkoutExercises,
      focusNextExercise,
      showAfterLastExercise,
      showAfterLastSet,
    ]
  );

  useEffect(() => {
    return () => {
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classNames(
        styles.root,
        timerIsOpenAndMinimized && styles.shrunk,
        'fade-in'
      )}
      ref={rootRef}
    >
      {activeWorkoutExercises.map((activeWorkoutExercise) => (
        <ActiveExerciseViewExercise
          key={activeWorkoutExercise.id}
          activeWorkoutExercise={activeWorkoutExercise}
          activeWorkoutExerciseChanged={activeWorkoutExerciseChanged}
          onCompleted={onCompleted}
          onDeleted={() =>
            activeWorkoutExerciseDeleted(activeWorkoutExercise.orderNumber)
          }
          exerciseCount={activeWorkoutExercises.length}
          scrolledIntoView={scrolledIntoView}
        />
      ))}
    </div>
  );
}
