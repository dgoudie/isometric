import React, { useCallback, useEffect, useRef, useState } from 'react';

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
  focusedExercise: ActiveExercise;
  focusedExerciseChanged: (exercise: ActiveExercise) => void;
}
export default function ActiveExerciseView({
  activeWorkoutExercises: activeWorkoutExercisesUnmemoized,
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
      setActiveWorkoutExercises(
        activeWorkoutExercises.map((previous, i) =>
          i === activeWorkoutExercise.orderNumber
            ? activeWorkoutExercise
            : previous
        )
      );
    },
    [activeWorkoutExercises]
  );

  const onCompleted = useCallback(
    (activeWorkoutExercise: ActiveWorkoutExerciseWithSetsAndDetails) => {
      let nextNonCompleteExercise = activeWorkoutExercises.find(
        (exercise) =>
          exercise.id !== activeWorkoutExercise.id &&
          !exercise.sets.every((set) => set.complete)
      );
      if (!!nextNonCompleteExercise) {
        focusedExerciseChanged({
          index: nextNonCompleteExercise.orderNumber,
          scrollIntoView: true,
        });
      }
      activeWorkoutExerciseChanged(activeWorkoutExercise);
    },
    [
      activeWorkoutExerciseChanged,
      activeWorkoutExercises,
      focusedExerciseChanged,
    ]
  );

  const { isOpenAndMinimized: timerIsOpenAndMinimized, cancel } =
    React.useContext(AfterExerciseTimerContext);

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
          exerciseCount={activeWorkoutExercises.length}
          scrolledIntoView={scrolledIntoView}
        />
      ))}
    </div>
  );
}
