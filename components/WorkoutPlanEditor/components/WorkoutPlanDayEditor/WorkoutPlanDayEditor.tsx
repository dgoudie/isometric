import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { Exercise, Prisma } from '@prisma/client';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import {
  deleteItemFromArray,
  moveItemInArray,
} from '../../../../utils/array-helpers';

import { DayWithExerciseIds } from '../../WorkoutPlanEditor';
import ExercisePickerBottomSheet from '../../../BottomSheet/components/ExercisePickerBottomSheet/ExercisePickerBottomSheet';
import WorkoutPlanDayExerciseEditor from '../WorkoutPlanDayExerciseEditor/WorkoutPlanDayExerciseEditor';
import classNames from 'classnames';
import styles from './WorkoutPlanDayEditor.module.scss';

interface Props {
  day: DayWithExerciseIds['day'];
  exerciseIds: number[];
  guid: string;
  dayChanged: (day: DayWithExerciseIds['day'], exerciseIds: number[]) => void;
  index: number;
  exerciseMap: Map<number, Exercise>;
  onDelete: () => void;
  dayReorderModeEnabled: boolean;
}

export default function WorkoutPlanDayEditor({
  day,
  exerciseIds,
  guid,
  dayChanged,
  index,
  exerciseMap,
  onDelete,
  dayReorderModeEnabled,
}: Props) {
  const [exercisePickerVisible, setExercisePickerVisible] = useState(false);

  const nicknameChanged = useCallback(
    (nickname: string) => dayChanged({ ...day, nickname }, exerciseIds),
    [day, dayChanged, exerciseIds]
  );

  const onExercisePickerResult = useCallback(
    (result: number | undefined) => {
      setExercisePickerVisible(false);
      if (typeof result !== 'undefined') {
        dayChanged(day, [...exerciseIds, result]);
      }
    },
    [day, dayChanged, exerciseIds]
  );

  const deleteDayWrapped = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      onDelete();
    },
    [onDelete]
  );

  const onDragEnd = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) {
        return;
      }
      if (destination.index === source.index) {
        return;
      }
      dayChanged(
        day,
        moveItemInArray(exerciseIds, source.index, destination.index)
      );
    },
    [day, dayChanged, exerciseIds]
  );

  const handleExerciseDelete = useCallback(
    (index: number) => {
      dayChanged(day, deleteItemFromArray(exerciseIds, index));
    },
    [day, dayChanged, exerciseIds]
  );

  return (
    <Draggable draggableId={guid} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className={classNames(styles.day, 'fade-in')}
          {...provided.draggableProps}
        >
          <div className={styles.dayHeader}>
            <div
              className={classNames(
                styles.dayHandle,
                dayReorderModeEnabled && styles.reordering
              )}
              {...provided.dragHandleProps}
            >
              <i className='fa-solid fa-grip-lines'></i>
            </div>
            <div className={styles.dayNumber}>Day {index + 1}</div>
            <div className={styles.nicknameInputWrapper}>
              <input
                placeholder='Enter a nickname...'
                defaultValue={day.nickname}
                onChange={(e) => nicknameChanged(e.target.value)}
              />
            </div>
            <button
              type='button'
              onClick={deleteDayWrapped}
              className={styles.deleteIcon}
            >
              <i className='fa-solid fa-trash'></i>
            </button>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={guid}>
              {(provided) => (
                <div
                  className={classNames(
                    styles.exercises,
                    dayReorderModeEnabled && styles.reorder
                  )}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {exerciseIds.map((exerciseId, index) => (
                    <WorkoutPlanDayExerciseEditor
                      index={index}
                      key={`day_${index}_${exerciseId}_${index}`}
                      exerciseId={exerciseId}
                      exerciseMap={exerciseMap}
                      onDelete={() => handleExerciseDelete(index)}
                      dayReorderModeEnabled={dayReorderModeEnabled}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {exerciseIds.length === 0 && (
            <div
              className={classNames(
                styles.noExercises,
                dayReorderModeEnabled && styles.reorder
              )}
            >
              Please add at least one exercise.
            </div>
          )}
          <button
            className={classNames(
              styles.addExercise,
              dayReorderModeEnabled && styles.reorder
            )}
            onClick={() => setExercisePickerVisible(true)}
          >
            <div className={styles.addExerciseHandle}>
              <i className='fa-solid fa-plus'></i>
            </div>
            <div className={styles.addExerciseName}>Add Exercise</div>
          </button>
          {exercisePickerVisible && (
            <ExercisePickerBottomSheet onResult={onExercisePickerResult} />
          )}
        </div>
      )}
    </Draggable>
  );
}
