import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import ActiveExerciseViewExerciseSet from '../ActiveExerciseViewExerciseSet/ActiveExerciseViewExerciseSet';
import { AfterExerciseTimerContext } from '../../providers/AfterExerciseTimer/AfterExerciseTimer';
import ConfirmationBottomSheet from '../BottomSheet/components/ConfirmationBottomSheet/ConfirmationBottomSheet';
import ExercisePickerBottomSheet from '../BottomSheet/components/ExercisePickerBottomSheet/ExercisePickerBottomSheet';
import MuscleGroupTag from '../MuscleGroupTag/MuscleGroupTag';
import { SnackbarContext } from '../../providers/Snackbar/Snackbar';
import { WorkoutContext } from '../../providers/Workout/Workout';
import { WorkoutExerciseWithSetsAndDetails } from '../../example_type';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import equal from 'deep-equal';
import styles from './ActiveExerciseViewExercise.module.scss';
import { useInView } from 'react-intersection-observer';

const ActiveExerciseViewExerciseInstances = dynamic(
  () =>
    import(
      '../ActiveExerciseViewExerciseInstances/ActiveExerciseViewExerciseInstances'
    ),
  { ssr: false }
);

interface Props {
  workoutExercise: WorkoutExerciseWithSetsAndDetails;
  nextWorkoutExercise: WorkoutExerciseWithSetsAndDetails | undefined;
  exerciseIndex: number;
  exerciseCount: number;
  onSelected: (i: number) => void;
  onCompleted: () => void;
}

export default function ActiveExerciseViewExercise({
  workoutExercise: workoutExerciseUnmemoized,
  exerciseIndex,
  nextWorkoutExercise,
  exerciseCount,
  onSelected,
  onCompleted,
}: Props) {
  const [workoutExercise, setWorkoutExercise] = useState(
    workoutExerciseUnmemoized
  );

  useEffect(() => {
    if (!equal(workoutExercise, workoutExerciseUnmemoized)) {
      setWorkoutExercise(workoutExerciseUnmemoized);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutExerciseUnmemoized]);

  const { show, showAfterLastExercise, showAfterLastSet, cancel } = useContext(
    AfterExerciseTimerContext
  );

  const getNumberOfCompletedSets = useCallback(
    () => workoutExercise.sets.filter((set) => set.complete).length,
    [workoutExercise]
  );

  const previousNumberOfCompletedSets = useRef(getNumberOfCompletedSets());

  const numberOfCompletedSets = getNumberOfCompletedSets();

  useEffect(() => {
    if (numberOfCompletedSets > previousNumberOfCompletedSets.current) {
      let allSetsCompleted =
        numberOfCompletedSets === workoutExercise.sets.length;
      if (allSetsCompleted) {
        if (!!nextWorkoutExercise) {
          showAfterLastSet(
            workoutExercise.exercise!.breakTimeInSeconds,
            nextWorkoutExercise.exercise.name,
            nextWorkoutExercise.exercise.primaryMuscleGroup,
            onCompleted
          );
        } else {
          showAfterLastExercise(workoutExercise.exercise.breakTimeInSeconds);
        }
      } else {
        show(workoutExercise.exercise.breakTimeInSeconds);
      }
    }
    previousNumberOfCompletedSets.current = numberOfCompletedSets;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutExercise, nextWorkoutExercise]);

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
    (exerciseId: number | undefined) => {
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
            <div className={styles.header}>{workoutExercise.exercise.name}</div>
            <div className={styles.groups}>
              {[
                workoutExercise.exercise.primaryMuscleGroup,
                ...(workoutExercise.exercise.secondaryMuscleGroups ?? []),
              ].map((group) => (
                <MuscleGroupTag key={group} muscleGroup={group} />
              ))}
            </div>
            {/* {!!workoutExercise.exercise.lastPerformed && (
              <ExerciseMetadata className={styles.metadata} exercise={data} />
            )} */}
            <div className={styles.sets}>
              {workoutExercise.sets.map((set, index) => (
                <ActiveExerciseViewExerciseSet
                  key={index}
                  set={set}
                  data={workoutExercise.exercise}
                  exerciseSelected={inView}
                  setSelected={numberOfCompletedSets === index}
                  exerciseIndex={exerciseIndex}
                  setIndex={index}
                />
              ))}
            </div>
            {showExercisePicker && (
              <ExercisePickerBottomSheet
                muscleGroup={workoutExercise.exercise.primaryMuscleGroup}
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
            exerciseName={workoutExercise.exercise.name}
          />
        </div>
      </div>
    </section>
  );
}
