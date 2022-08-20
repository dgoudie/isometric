import { IExercise, IWorkoutExercise } from '@dgoudie/isometric-types';
import React, { Suspense, useMemo } from 'react';

import BottomSheet from '../../BottomSheet';
import MuscleGroupTag from '../../../MuscleGroupTag/MuscleGroupTag';
import { ReadableResource } from '../../../../utils/fetch-from-api';
import RouteLoader from '../../../RouteLoader/RouteLoader';
import classNames from 'classnames';
import styles from './WorkoutExercisesBottomSheet.module.scss';

interface Props {
  exercises: IWorkoutExercise[];
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
  exercises,
}: WorkoutExercisesBottomSheetContentProps) {
  const exerciseElements = exercises.map((exercise, index) => {
    const exerciseComplete = exercise.sets.every((set) => set.complete);
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
        <div className={styles.itemText}>{exercise.name}</div>
        <MuscleGroupTag muscleGroup={exercise.primaryMuscleGroup} />
      </button>
    );
  });

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
