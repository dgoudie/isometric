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
import { AfterExerciseTimerContext } from '../../providers/AfterExerciseTimer/AfterExerciseTimer';
import ConfirmationBottomSheet from '../BottomSheet/components/ConfirmationBottomSheet/ConfirmationBottomSheet';
import ExercisePickerBottomSheet from '../BottomSheet/components/ExercisePickerBottomSheet/ExercisePickerBottomSheet';
import MuscleGroupTag from '../MuscleGroupTag/MuscleGroupTag';
import { SnackbarContext } from '../../providers/Snackbar/Snackbar';
import ThreeDotLoader from '../ThreeDotLoader/ThreeDotLoader';
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
  onDeleted: () => void;
  exerciseCount: number;
  scrolledIntoView: (i: number) => void;
}

export default function ActiveExerciseViewExercise({
  activeWorkoutExercise: activeWorkoutExerciseUnmemoized,
  activeWorkoutExerciseChanged,
  onCompleted,
  onDeleted,
  exerciseCount,
  scrolledIntoView,
}: Props) {
  const [activeWorkoutExercise, setActiveWorkoutExercise] = useState(
    activeWorkoutExerciseUnmemoized
  );

  const { show } = useContext(AfterExerciseTimerContext);

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
        if (complete) {
          show();
        }
        activeWorkoutExerciseChanged({ ...activeWorkoutExercise, sets });
      }
    },
    [activeWorkoutExercise, activeWorkoutExerciseChanged, onCompleted, show]
  );

  const onSetChangedExceptCompleted = useCallback(
    (
      updatedSet: ActiveWorkoutExerciseSet,
      isResistanceChange: boolean = false
    ) => {
      let sets = activeWorkoutExercise.sets.map((currentSet, index) =>
        updatedSet.orderNumber === index ? updatedSet : currentSet
      );
      if (isResistanceChange && updatedSet.resistanceInPounds !== null) {
        sets = sets.map((set) => {
          if (
            set.orderNumber > updatedSet.orderNumber &&
            !set.complete &&
            (set.resistanceInPounds === null || set.repetitions === null)
          ) {
            set.resistanceInPounds = updatedSet.resistanceInPounds;
          }
          return set;
        });
      }
      activeWorkoutExerciseChanged({
        ...activeWorkoutExercise,
        sets,
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

  const [loading, setLoading] = useState(false);

  const newExerciseSelected = useCallback(
    async (exerciseId: string | undefined) => {
      if (!!exerciseId) {
        setLoading(true);
        scrollToTop();
        await replaceExercise(activeWorkoutExercise.id, exerciseId);
        openSnackbar(`Exercise replaced.`, 2000);
      }
      setShowExercisePicker(false);
    },
    [activeWorkoutExercise.id, openSnackbar, replaceExercise, scrollToTop]
  );

  const removeExercise = useCallback(
    async (removalConfirmed: boolean) => {
      if (!!removalConfirmed) {
        setLoading(true);
        scrollToTop();
        await deleteExercise(activeWorkoutExercise.id);
        onDeleted();
        openSnackbar(`Exercise removed.`, 2000);
      }
      setShowDeleteExeciseConfirmationBottomSheet(false);
    },
    [
      activeWorkoutExercise.id,
      deleteExercise,
      onDeleted,
      openSnackbar,
      scrollToTop,
    ]
  );

  const activeSetOrderNumber = useMemo(
    () => activeWorkoutExercise.sets.findIndex((set) => !set.complete),
    [activeWorkoutExercise.sets]
  );

  return (
    <section ref={ref} className={classNames(styles.section, 'fade-in')}>
      <div
        className={classNames(
          styles.sectionInner,
          loading && styles.sectionInnerLoading
        )}
        ref={sectionInnerRef}
      >
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
            <div className={styles.sets}>
              {activeWorkoutExercise.sets.map((set) => (
                <ActiveExerciseViewExerciseSet
                  key={set.orderNumber}
                  activeWorkoutExercise={activeWorkoutExercise}
                  set={set}
                  exerciseIsActive={inView}
                  isActive={set.orderNumber === activeSetOrderNumber}
                  onChangedExceptCompleted={onSetChangedExceptCompleted}
                  onCompleteToggled={(complete) => {
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
          {loading && (
            <div
              className={styles.loading}
              onClick={(event) => event.stopPropagation()}
            >
              <ThreeDotLoader />
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <ActiveExerciseViewExerciseInstances
            exerciseName={activeWorkoutExercise.exercise.name}
          />
        </div>
      </div>
    </section>
  );
}
