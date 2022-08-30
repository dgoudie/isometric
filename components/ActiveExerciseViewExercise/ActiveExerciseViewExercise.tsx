import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import ActiveExerciseViewExerciseInstances from '../ActiveExerciseViewExerciseInstances/ActiveExerciseViewExerciseInstances';
import ActiveExerciseViewExerciseSet from '../ActiveExerciseViewExerciseSet/ActiveExerciseViewExerciseSet';
import { ActiveWorkoutExerciseSet } from '@prisma/client';
import { ActiveWorkoutExerciseWithSetsAndDetails } from '../../types/ActiveWorkoutExercise';
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
  activeWorkoutExerciseChanged: (
    activeWorkoutExercise: ActiveWorkoutExerciseWithSetsAndDetails
  ) => void;
  onCompleted: (
    activeWorkoutExercise: ActiveWorkoutExerciseWithSetsAndDetails
  ) => void;
  exerciseCount: number;
  scrolledIntoView: (i: number) => void;
}

export default function ActiveExerciseViewExercise({
  activeWorkoutExercise: activeWorkoutExerciseUnmemoized,
  activeWorkoutExerciseChanged,
  onCompleted,
  exerciseCount,
  scrolledIntoView,
}: Props) {
  const [activeWorkoutExercise, setActiveWorkoutExercise] = useState(
    activeWorkoutExerciseUnmemoized
  );

  const onSetCompleted = useCallback(
    (setOrderNumber: number, complete: boolean) => {
      const sets = activeWorkoutExercise.sets.map((set, index) => {
        let derivedComplete: boolean = false;
        if (setOrderNumber === index) {
          derivedComplete = complete;
        } else if (index > setOrderNumber) {
          derivedComplete = false;
        } else {
          derivedComplete = true;
        }
        return { ...set, complete: derivedComplete };
      });
      if (sets.every((set) => set.complete)) {
        onCompleted({ ...activeWorkoutExercise, sets });
      } else {
        activeWorkoutExerciseChanged({ ...activeWorkoutExercise, sets });
      }
    },
    [activeWorkoutExercise, activeWorkoutExerciseChanged, onCompleted]
  );

  const onSetChangedExceptCompleted = useCallback(
    (set: ActiveWorkoutExerciseSet) => {
      activeWorkoutExerciseChanged({
        ...activeWorkoutExercise,
        sets: activeWorkoutExercise.sets.map((currentSet, index) =>
          set.orderNumber === index ? set : currentSet
        ),
      });
    },
    [activeWorkoutExercise, activeWorkoutExerciseChanged]
  );

  useEffect(() => {
    if (!equal(activeWorkoutExercise, activeWorkoutExerciseUnmemoized)) {
      setActiveWorkoutExercise(activeWorkoutExerciseUnmemoized);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWorkoutExerciseUnmemoized]);

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
      scrolledIntoView(activeWorkoutExercise.orderNumber);
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
  }, [
    inView,
    scrolledIntoView,
    scrollToTop,
    activeWorkoutExercise.orderNumber,
  ]);

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
        replaceExercise(activeWorkoutExercise.id, exerciseId);
        openSnackbar(`Exercise replaced.`, 2000);
        scrollToTop();
      }
      setShowExercisePicker(false);
    },
    [activeWorkoutExercise.id, openSnackbar, replaceExercise, scrollToTop]
  );

  const removeExercise = useCallback(
    (removalConfirmed: boolean) => {
      if (!!removalConfirmed) {
        deleteExercise(activeWorkoutExercise.id);
        openSnackbar(`Exercise removed.`, 2000);
        scrollToTop();
      }
      setShowDeleteExeciseConfirmationBottomSheet(false);
    },
    [activeWorkoutExercise.id, deleteExercise, openSnackbar, scrollToTop]
  );

  const activeSetOrderNumber = useMemo(
    () => activeWorkoutExercise.sets.findIndex((set) => !set.complete),
    [activeWorkoutExercise.sets]
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
              {activeWorkoutExercise.sets.map((set) => (
                <ActiveExerciseViewExerciseSet
                  key={set.orderNumber}
                  activeWorkoutExercise={activeWorkoutExercise}
                  set={set}
                  exerciseIsActive={inView}
                  isActive={set.orderNumber === activeSetOrderNumber}
                  onChangedExceptCompleted={onSetChangedExceptCompleted}
                  onCompleted={(complete) => {
                    onSetCompleted(set.orderNumber, complete);
                  }}
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
