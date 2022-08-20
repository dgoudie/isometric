import React, { MouseEvent, useCallback } from 'react';

import { Draggable } from 'react-beautiful-dnd';
import { IExercise } from '@dgoudie/isometric-types';
import MuscleGroupTag from '../../../MuscleGroupTag/MuscleGroupTag';
import classNames from 'classnames';
import styles from './WorkoutPlanDayExerciseEditor.module.scss';

interface Props {
  index: number;
  exerciseId: string;
  exerciseMap: Map<string, IExercise>;
  onDelete: () => void;
  dayReorderModeEnabled: boolean;
}

export default function WorkoutPlanDayExerciseEditor({
  index,
  exerciseId,
  exerciseMap,
  onDelete,
  dayReorderModeEnabled,
}: Props) {
  const deleteExerciseWrapped = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      onDelete();
    },
    [onDelete]
  );

  const exercise = exerciseMap.get(exerciseId)!;
  return (
    <Draggable draggableId={exerciseId} index={index}>
      {(provided) => (
        <div
          className={classNames(
            styles.exercise,
            dayReorderModeEnabled && styles.reordering
          )}
          key={`${exerciseId}_${index}`}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className={styles.exerciseHandle} {...provided.dragHandleProps}>
            <i className='fa-solid fa-grip-lines'></i>
          </div>
          <div className={styles.exerciseName}>{exercise.name}</div>
          <MuscleGroupTag muscleGroup={exercise.primaryMuscleGroup} />
          <button
            type='button'
            onClick={deleteExerciseWrapped}
            className={styles.deleteIcon}
          >
            <i className='fa-solid fa-xmark'></i>
          </button>
        </div>
      )}
    </Draggable>
  );
}
