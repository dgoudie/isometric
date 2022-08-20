import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { IExercise, IScheduleDay } from '@dgoudie/isometric-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  deleteItemFromArray,
  moveItemInArray,
  replaceItemInArray,
} from '../../utils/array-helpers';

import CopyDayBottomSheet from '../BottomSheet/components/CopyDayBottomSheet/CopyDayBottomSheet';
import { ObjectId } from 'bson';
import WorkoutPlanDayEditor from './components/WorkoutPlanDayEditor/WorkoutPlanDayEditor';
import classNames from 'classnames';
import styles from './WorkoutPlanEditor.module.scss';

interface Props {
  days: IScheduleDay[];
  daysChanged: (days: IScheduleDay[]) => void;
  exerciseMap: Map<string, IExercise>;
  dayReorderModeEnabled?: boolean;
}

export default function WorkoutPlanEditor({
  days,
  exerciseMap,
  daysChanged,
  dayReorderModeEnabled = false,
}: Props) {
  const [copyDayVisible, setCopyDayVisible] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => listRef.current?.scrollTo({ top: 0, behavior: 'smooth' }),
      250
    );
    return () => {
      clearTimeout(timeoutId as unknown as number);
    };
  }, [listRef, dayReorderModeEnabled]);

  const updateAndReportDays = useCallback(
    (updatedDays: IScheduleDay[]) => {
      daysChanged(updatedDays);
    },
    [daysChanged]
  );

  const onDragEnd = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) {
        return;
      }
      if (destination.index === source.index) {
        return;
      }
      updateAndReportDays(
        moveItemInArray(days, source.index, destination.index)
      );
    },
    [days, updateAndReportDays]
  );

  const handleAdd = useCallback(() => {
    updateAndReportDays([
      ...days,
      { exerciseIds: [], nickname: '', _id: new ObjectId().toString() },
    ]);
  }, [days, updateAndReportDays]);

  const handleDelete = useCallback(
    (index: number) => {
      updateAndReportDays(deleteItemFromArray(days, index));
    },
    [days, updateAndReportDays]
  );

  const dayChanged = useCallback(
    (day: IScheduleDay, index: number) => {
      updateAndReportDays(replaceItemInArray(days, index, day));
    },
    [days, updateAndReportDays]
  );

  const onCopyDayResult = useCallback(
    (result: number | undefined) => {
      if (typeof result !== 'undefined') {
        const day = days[result];
        daysChanged([...days, { ...day, _id: new ObjectId().toString() }]);
      }
      setCopyDayVisible(false);
    },
    [days, daysChanged]
  );

  if (!days.length) {
    return (
      <div className={styles.noDays}>
        <span>
          Here, you can build a workout schedule. Start by adding a day, and
          adding some exercises.
        </span>
        <button className={'standard-button primary'} onClick={handleAdd}>
          <i className='fa-solid fa-plus'></i>
          Add Day
        </button>
      </div>
    );
  }

  return (
    <div className={styles.list} ref={listRef}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='workout_plan_days'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {days.map((day, index) => (
                <WorkoutPlanDayEditor
                  key={day._id}
                  day={day}
                  dayChanged={(day) => dayChanged(day, index)}
                  index={index}
                  exerciseMap={exerciseMap}
                  onDelete={() => handleDelete(index)}
                  dayReorderModeEnabled={dayReorderModeEnabled}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div
        className={classNames(
          styles.addDay,
          dayReorderModeEnabled && styles.reorder
        )}
      >
        <button
          className={'standard-button'}
          onClick={() => setCopyDayVisible(true)}
        >
          <i className='fa-solid fa-copy'></i>
          Copy Day
        </button>
        <button className={'standard-button primary'} onClick={handleAdd}>
          <i className='fa-solid fa-plus'></i>
          Add Day
        </button>
      </div>
      {copyDayVisible && (
        <CopyDayBottomSheet days={days} onResult={onCopyDayResult} />
      )}
    </div>
  );
}
