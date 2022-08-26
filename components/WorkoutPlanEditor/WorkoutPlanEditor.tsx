import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { Exercise, Prisma } from '@prisma/client';
import {
  deleteItemFromArray,
  moveItemInArray,
  replaceItemInArray,
} from '../../utils/array-helpers';
import { useCallback, useEffect, useRef, useState } from 'react';

import CopyDayBottomSheet from '../BottomSheet/components/CopyDayBottomSheet/CopyDayBottomSheet';
import WorkoutPlanDayEditor from './components/WorkoutPlanDayEditor/WorkoutPlanDayEditor';
import classNames from 'classnames';
import styles from './WorkoutPlanEditor.module.scss';
import { v4 as uuidv4 } from 'uuid';

export interface DayWithExerciseIds {
  day: Prisma.ScheduleDayCreateInput;
  exerciseIds: number[];
  guid: string;
}

interface Props {
  days: DayWithExerciseIds[];
  daysChanged: (days: DayWithExerciseIds[]) => void;
  exerciseMap: Map<number, Exercise>;
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

  const onDragEnd = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) {
        return;
      }
      if (destination.index === source.index) {
        return;
      }
      daysChanged(moveItemInArray(days, source.index, destination.index));
    },
    [days, daysChanged]
  );

  const handleAdd = useCallback(() => {
    daysChanged([
      ...days,
      {
        day: { nickname: '', orderNumber: days.length },
        exerciseIds: [],
        guid: uuidv4(),
      },
    ]);
  }, [days, daysChanged]);

  const handleDelete = useCallback(
    (index: number) => {
      daysChanged(deleteItemFromArray(days, index));
    },
    [daysChanged, days]
  );

  const dayChanged = useCallback(
    (day: typeof days[0], index: number) => {
      daysChanged(replaceItemInArray(days, index, day));
    },
    [days, daysChanged]
  );

  const onCopyDayResult = useCallback(
    (result: number | undefined) => {
      if (typeof result !== 'undefined') {
        const day = days[result];
        daysChanged([...days, { ...day, guid: uuidv4() }]);
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
              {days.map(({ day, exerciseIds, guid }, index) => (
                <WorkoutPlanDayEditor
                  key={guid}
                  day={day}
                  guid={guid}
                  exerciseIds={exerciseIds}
                  dayChanged={(day, exerciseIds) =>
                    dayChanged({ day, exerciseIds, guid }, index)
                  }
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
