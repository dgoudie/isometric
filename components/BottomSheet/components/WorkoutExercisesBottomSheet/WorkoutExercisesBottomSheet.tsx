import { ActiveWorkoutExerciseWithSetsAndDetails } from '../../../../types/ActiveWorkoutExercise';
import BottomSheet from '../../BottomSheet';
import MuscleGroupTag from '../../../MuscleGroupTag/MuscleGroupTag';
import RouteLoader from '../../../RouteLoader/RouteLoader';
import { Suspense } from 'react';
import classNames from 'classnames';
import styles from './WorkoutExercisesBottomSheet.module.scss';

interface Props {
  activeWorkoutExercises: ActiveWorkoutExerciseWithSetsAndDetails[];
  onResult: (resultIndex: number | undefined | 'add') => void;
}

export default function WorkoutExercisesBottomSheet({
  onResult,
  ...props
}: Props) {
  return (
    <BottomSheet onResult={onResult} title={`Today`}>
      {(onResult) => (
        <div className={styles.root}>
          <Suspense fallback={<RouteLoader />}>
            <WorkoutExercisesBottomSheetContent
              onResult={onResult}
              {...props}
            />
          </Suspense>
        </div>
      )}
    </BottomSheet>
  );
}

interface WorkoutExercisesBottomSheetContentProps
  extends Omit<Props, 'onResult'> {
  onResult: (resultIndex: number | 'add') => void;
}

function WorkoutExercisesBottomSheetContent({
  onResult,
  activeWorkoutExercises,
}: WorkoutExercisesBottomSheetContentProps) {
  const exerciseElements = activeWorkoutExercises.map(
    (activeWorkoutExercise, index) => {
      const exerciseComplete = activeWorkoutExercise.sets.every(
        (set) => set.complete
      );
      return (
        <button
          key={index}
          className={classNames(
            styles.item,
            exerciseComplete && styles.itemComplete
          )}
          onClick={() => onResult(index)}
        >
          <i
            className={classNames('fa-solid', exerciseComplete && 'fa-check')}
          ></i>
          <div className={styles.itemText}>
            {activeWorkoutExercise.exercise.name}
          </div>
          <MuscleGroupTag
            muscleGroup={activeWorkoutExercise.exercise.primaryMuscleGroup}
          />
        </button>
      );
    }
  );

  return (
    <div className={styles.items}>
      {exerciseElements}
      <button className={styles.item} onClick={() => onResult('add')}>
        <i className={classNames('fa-solid', 'fa-plus')}></i>
        <div className={styles.itemText}>Add</div>
      </button>
    </div>
  );
}
