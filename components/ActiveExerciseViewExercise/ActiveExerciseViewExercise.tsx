import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import ActiveExerciseViewExerciseInstances from '../ActiveExerciseViewExerciseInstances/ActiveExerciseViewExerciseInstances';
import ActiveExerciseViewExerciseSet from '../ActiveExerciseViewExerciseSet/ActiveExerciseViewExerciseSet';
import { ActiveWorkoutExerciseWithSetsAndDetails } from '../../types/ActiveWorkoutExercise';
import { AfterExerciseTimerContext } from '../../providers/AfterExerciseTimer/AfterExerciseTimer';
import ConfirmationBottomSheet from '../BottomSheet/components/ConfirmationBottomSheet/ConfirmationBottomSheet';
import ExercisePickerBottomSheet from '../BottomSheet/components/ExercisePickerBottomSheet/ExercisePickerBottomSheet';
import MuscleGroupTag from '../MuscleGroupTag/MuscleGroupTag';
import { SnackbarContext } from '../../providers/Snackbar/Snackbar';
import { WorkoutContext } from '../../providers/Workout/Workout';
import classNames from 'classnames';
import equal from 'deep-equal';
import styles from './ActiveExerciseViewExercise.module.scss';
import { useInView } from 'react-intersection-observer';

interface Props {
  activeWorkoutExercise: ActiveWorkoutExerciseWithSetsAndDetails;
  nextActiveWorkoutExercise:
    | ActiveWorkoutExerciseWithSetsAndDetails
    | undefined;
  exerciseIndex: number;
  exerciseCount: number;
  onSelected: (i: number) => void;
  onCompleted: () => void;
}

export default function ActiveExerciseViewExercise({
  activeWorkoutExercise: activeWorkoutExerciseUnmemoized,
  exerciseIndex,
  nextActiveWorkoutExercise,
  exerciseCount,
  onSelected,
  onCompleted,
}: Props) {
  const [activeWorkoutExercise, setActiveWorkoutExercise] = useState(
    activeWorkoutExerciseUnmemoized
  );

  useEffect(() => {
    if (!equal(activeWorkoutExercise, activeWorkoutExerciseUnmemoized)) {
      setActiveWorkoutExercise(activeWorkoutExerciseUnmemoized);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWorkoutExerciseUnmemoized]);

  const { show, showAfterLastExercise, showAfterLastSet, cancel } = useContext(
    AfterExerciseTimerContext
  );

  const getNumberOfCompletedSets = useCallback(
    () => activeWorkoutExercise.sets.filter((set) => set.complete).length,
    [activeWorkoutExercise]
  );

  const previousNumberOfCompletedSets = useRef(getNumberOfCompletedSets());

  const numberOfCompletedSets = getNumberOfCompletedSets();

  useEffect(() => {
    if (numberOfCompletedSets > previousNumberOfCompletedSets.current) {
      let allSetsCompleted =
        numberOfCompletedSets === activeWorkoutExercise.sets.length;
      if (allSetsCompleted) {
        if (!!nextActiveWorkoutExercise) {
          showAfterLastSet(
            nextActiveWorkoutExercise.exercise.name,
            nextActiveWorkoutExercise.exercise.primaryMuscleGroup,
            onCompleted
          );
        } else {
          showAfterLastExercise();
        }
      } else {
        show();
      }
    }
    previousNumberOfCompletedSets.current = numberOfCompletedSets;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWorkoutExercise, nextActiveWorkoutExercise]);

  const { ref, inView } = useInView({
    threshold: 0.55,
  });

  const wasInViewPreviously = useRef(inView);

  const sectionInnerRef = useRef<HTMLDivElement>(null);

  const timeoutId = useRef<number>();

  const scrollToTop = useCallback(() => {
    sectionInnerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sectionInnerRef]);

  useEffect(() => {
    if (inView) {
      onSelected(exerciseIndex);
    } else if (!inView && wasInViewPreviously.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(
        () => scrollToTop(),
        1000
      ) as unknown as number;
    }
    wasInViewPreviously.current = inView;
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [inView, onSelected, exerciseIndex, scrollToTop]);

  const { replaceExercise, deleteExercise } = useContext(WorkoutContext);

  const [showExercisePicker, setShowExercisePicker] = useState(false);

  const [
    showDeleteExeciseConfirmationBottomSheet,
    setShowDeleteExeciseConfirmationBottomSheet,
  ] = useState(false);

  const { openSnackbar } = useContext(SnackbarContext);

  const newExerciseSelected = useCallback(
    (exerciseId: string | undefined) => {
      if (!!exerciseId) {
        replaceExercise(exerciseIndex, exerciseId);
        openSnackbar(`Exercise replaced.`, 2000);
        scrollToTop();
      }
      setShowExercisePicker(false);
    },
    [exerciseIndex, openSnackbar, replaceExercise, scrollToTop]
  );

  const removeExercise = useCallback(
    (removalConfirmed: boolean) => {
      if (!!removalConfirmed) {
        deleteExercise(exerciseIndex);
        openSnackbar(`Exercise removed.`, 2000);
        scrollToTop();
      }
      setShowDeleteExeciseConfirmationBottomSheet(false);
    },
    [deleteExercise, exerciseIndex, openSnackbar, scrollToTop]
  );

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.sectionInner} ref={sectionInnerRef}>
        <div className={styles.main}>
          <div className={styles.mainContent}>
            <div className={styles.header}>
              {activeWorkoutExercise.exercise.name}
            </div>
            <div className={styles.groups}>
              {[
                activeWorkoutExercise.exercise.primaryMuscleGroup,
                ...(activeWorkoutExercise.exercise.secondaryMuscleGroups ?? []),
              ].map((group) => (
                <MuscleGroupTag key={group} muscleGroup={group} />
              ))}
            </div>
            {/* {!!workoutExercise.exercise.lastPerformed && (
              <ExerciseMetadata className={styles.metadata} exercise={data} />
            )} */}
            <div className={styles.sets}>
              {activeWorkoutExercise.sets.map((set, index) => (
                <ActiveExerciseViewExerciseSet
                  key={index}
                  exercise={activeWorkoutExercise.exercise}
                  set={set}
                  exerciseSelected={inView}
                  setSelected={numberOfCompletedSets === index}
                  exerciseIndex={exerciseIndex}
                  setIndex={index}
                />
              ))}
            </div>
            {showExercisePicker && (
              <ExercisePickerBottomSheet
                muscleGroup={activeWorkoutExercise.exercise.primaryMuscleGroup}
                onResult={newExerciseSelected}
              />
            )}
            {showDeleteExeciseConfirmationBottomSheet && (
              <ConfirmationBottomSheet
                prompt="Are you sure you'd like to remove this exercise from your workout?"
                onResult={removeExercise}
              />
            )}
          </div>
          <div className={classNames(styles.mainFooter)}>
            <i className='fa-solid fa-chevron-up'></i>
            <span>Swipe up to view options & history</span>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.exerciseActions}>
            <button
              type='button'
              onClick={() => setShowExercisePicker(true)}
              className={classNames(
                'standard-button slim outlined',
                styles.replaceExercise
              )}
            >
              <i className='fa-solid fa-dumbbell'></i>
              Replace Exercise
            </button>
            {exerciseCount > 1 && (
              <button
                type='button'
                onClick={() =>
                  setShowDeleteExeciseConfirmationBottomSheet(true)
                }
                className={classNames('standard-button slim danger')}
              >
                <i className='fa-solid fa-trash'></i>
              </button>
            )}
          </div>
          <ActiveExerciseViewExerciseInstances
            exerciseName={activeWorkoutExercise.exercise.name}
          />
        </div>
      </div>
    </section>
  );
}
