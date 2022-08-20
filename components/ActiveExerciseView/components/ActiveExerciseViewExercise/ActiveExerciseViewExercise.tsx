import { IExerciseExtended, IWorkoutExercise } from '@dgoudie/isometric-types';
import {
  ReadableResource,
  emptyReadableResource,
  fetchFromApiAsReadableResource,
} from '../../../../utils/fetch-from-api';
import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';

import ActiveExerciseViewExerciseSet from '../ActiveExerciseViewExerciseSet/ActiveExerciseViewExerciseSet';
import { AfterExerciseTimerContext } from '../../../../providers/AfterExerciseTimer/AfterExerciseTimer';
import ConfirmationBottomSheet from '../../../BottomSheet/components/ConfirmationBottomSheet/ConfirmationBottomSheet';
import ExerciseMetadata from '../../../ExerciseMetadata/ExerciseMetadata';
import ExercisePickerBottomSheet from '../../../BottomSheet/components/ExercisePickerBottomSheet/ExercisePickerBottomSheet';
import Loader from '../../../Loader/Loader';
import MuscleGroupTag from '../../../MuscleGroupTag/MuscleGroupTag';
import SetView from '../../../SetView/SetView';
import { SnackbarContext } from '../../../../providers/Snackbar/Snackbar';
import { WorkoutContext } from '../../../../providers/Workout/Workout';
import classNames from 'classnames';
import equal from 'deep-equal';
import styles from './ActiveExerciseViewExercise.module.scss';
import { useInView } from 'react-intersection-observer';

interface Props {
  exercise: IWorkoutExercise;
  data: IExerciseExtended;
  nextExercise: IExerciseExtended | undefined;
  exerciseIndex: number;
  exerciseCount: number;
  onSelected: (i: number) => void;
  onCompleted: () => void;
}

const format = new Intl.DateTimeFormat('en-US');

let initialInstancesResponse = emptyReadableResource();

export default function ActiveExerciseViewExercise({
  exercise: exerciseUnmemoized,
  data,
  exerciseIndex,
  nextExercise,
  exerciseCount,
  onSelected,
  onCompleted,
}: Props) {
  const [exercise, setExercise] = useState(exerciseUnmemoized);

  useEffect(() => {
    if (!equal(exercise, exerciseUnmemoized)) {
      setExercise(exerciseUnmemoized);
    }
  }, [exerciseUnmemoized]);

  const [instancesResource, setInstancesResource] = useState<
    ReadableResource<IWorkoutExercise[]>
  >(initialInstancesResponse);

  const [_isPending, startTransaction] = useTransition();

  useEffect(() => {
    startTransaction(() => {
      const updatedInstancesResource = fetchFromApiAsReadableResource<
        IWorkoutExercise[]
      >(`/api/workout-instances/${exercise.name}`);
      setInstancesResource(updatedInstancesResource);
    });
  }, [exercise.name]);

  const { show, showAfterLastExercise, showAfterLastSet, cancel } = useContext(
    AfterExerciseTimerContext
  );

  const getNumberOfCompletedSets = useCallback(
    () => exercise.sets.filter((set) => set.complete).length,
    [exercise]
  );

  const previousNumberOfCompletedSets = useRef(getNumberOfCompletedSets());

  const numberOfCompletedSets = getNumberOfCompletedSets();

  useEffect(() => {
    if (numberOfCompletedSets > previousNumberOfCompletedSets.current) {
      let allSetsCompleted = numberOfCompletedSets === exercise.sets.length;
      if (allSetsCompleted) {
        if (!!nextExercise) {
          showAfterLastSet(
            data.breakTimeInSeconds,
            nextExercise.name,
            nextExercise.primaryMuscleGroup,
            onCompleted
          );
        } else {
          showAfterLastExercise(data.breakTimeInSeconds);
        }
      } else {
        show(data.breakTimeInSeconds);
      }
    }
    previousNumberOfCompletedSets.current = numberOfCompletedSets;
  }, [exercise, nextExercise]);

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

  const newExerciseSelected = useCallback(
    (exerciseId: string | undefined) => {
      if (!!exerciseId) {
        replaceExercise(exerciseIndex, exerciseId);
        openSnackbar(`Exercise replaced.`, 2000);
        scrollToTop();
      }
      setShowExercisePicker(false);
    },
    [exerciseIndex]
  );

  const { openSnackbar } = useContext(SnackbarContext);

  const removeExercise = useCallback(
    (removalConfirmed: boolean) => {
      if (!!removalConfirmed) {
        deleteExercise(exerciseIndex);
        openSnackbar(`Exercise removed.`, 2000);
        scrollToTop();
      }
      setShowDeleteExeciseConfirmationBottomSheet(false);
    },
    [exerciseIndex]
  );

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.sectionInner} ref={sectionInnerRef}>
        <div className={styles.main}>
          <div className={styles.mainContent}>
            <div className={styles.header}>{data.name}</div>
            <div className={styles.groups}>
              {[
                data.primaryMuscleGroup,
                ...(data.secondaryMuscleGroups ?? []),
              ].map((group) => (
                <MuscleGroupTag key={group} muscleGroup={group} />
              ))}
            </div>
            {!!data.lastPerformed && (
              <ExerciseMetadata className={styles.metadata} exercise={data} />
            )}
            <div className={styles.sets}>
              {exercise.sets.map((set, index) => (
                <ActiveExerciseViewExerciseSet
                  key={index}
                  set={set}
                  data={data}
                  exerciseSelected={inView}
                  setSelected={numberOfCompletedSets === index}
                  exerciseIndex={exerciseIndex}
                  setIndex={index}
                />
              ))}
            </div>
            {showExercisePicker && (
              <ExercisePickerBottomSheet
                muscleGroup={data.primaryMuscleGroup}
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
          <Suspense fallback={<Loader />}>
            <Instances instancesResource={instancesResource} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

interface InstancesProps {
  instancesResource: ReadableResource<IWorkoutExercise[]>;
}

function Instances({ instancesResource }: InstancesProps) {
  const instances = useMemo(
    () => instancesResource.read(),
    [instancesResource]
  );
  return (
    <div className={styles.instances}>
      <div className={styles.instancesHeader}>Recent History</div>
      {!!instances.length ? (
        <div className={styles.instancesItems}>
          {instances.map((instance, index) => (
            <div className={styles.instancesItemsItem} key={index}>
              <div>{format.format(new Date(instance.performedAt))}</div>
              <SetView
                key={index}
                exerciseType={instance.exerciseType}
                sets={instance.sets}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noInstances}>
          <i className='fa-solid fa-circle-info'></i>
          <span>You have not performed this exercise before.</span>
        </div>
      )}
    </div>
  );
}
