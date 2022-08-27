import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ActiveExercise } from '../../pages/workout';
import ActiveExerciseViewExercise from '../ActiveExerciseViewExercise/ActiveExerciseViewExercise';
import { ActiveWorkoutExerciseWithSetsAndDetails } from '../../types/ActiveWorkoutExercise';
import { AfterExerciseTimerContext } from '../../providers/AfterExerciseTimer/AfterExerciseTimer';
import classNames from 'classnames';
import styles from './ActiveExerciseView.module.scss';
import { usePageVisibility } from 'react-page-visibility';

interface Props {
  activeWorkoutExercises: ActiveWorkoutExerciseWithSetsAndDetails[];
  focusedExercise: ActiveExercise;
  focusedExerciseChanged: (exercise: ActiveExercise) => void;
}
export default function ActiveExerciseView({
  activeWorkoutExercises,
  focusedExercise,
  focusedExerciseChanged,
}: Props) {
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

  const [nextNoncompleteExercise, setNextNoncompleteExercise] = useState<{
    index: number;
    activeWorkoutExercise: ActiveWorkoutExerciseWithSetsAndDetails;
  }>();

  useEffect(() => {
    let indexOfNextNonCompleteExercise = activeWorkoutExercises.findIndex(
      (exercise, i) =>
        focusedExercise.index !== i &&
        !exercise.sets.every((set) => set.complete)
    );
    if (indexOfNextNonCompleteExercise >= 0) {
      setNextNoncompleteExercise({
        index: indexOfNextNonCompleteExercise,
        activeWorkoutExercise:
          activeWorkoutExercises[indexOfNextNonCompleteExercise],
      });
    } else {
      setNextNoncompleteExercise(undefined);
    }
  }, [activeWorkoutExercises, focusedExercise]);

  const onSelected = useCallback(
    (index: number) => {
      focusedExerciseChanged({ index, scrollIntoView: false });
    },
    [focusedExerciseChanged]
  );
  const onCompleted = useCallback(() => {
    if (typeof nextNoncompleteExercise !== 'undefined') {
      focusedExerciseChanged({
        index: nextNoncompleteExercise.index,
        scrollIntoView: true,
      });
    }
  }, [nextNoncompleteExercise, focusedExerciseChanged]);

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
      {activeWorkoutExercises.map((exercise, index) => (
        <ActiveExerciseViewExercise
          key={index}
          activeWorkoutExercise={exercise}
          nextActiveWorkoutExercise={
            nextNoncompleteExercise?.activeWorkoutExercise
          }
          exerciseIndex={index}
          exerciseCount={activeWorkoutExercises.length}
          onSelected={onSelected}
          onCompleted={onCompleted}
        />
      ))}
    </div>
  );
}
