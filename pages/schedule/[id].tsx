import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { useCallback, useEffect, useState } from 'react';

import AppBarWithAppHeaderLayout from '../../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import ExercisePickerBottomSheet from '../../components/BottomSheet/components/ExercisePickerBottomSheet/ExercisePickerBottomSheet';
import Link from 'next/link';
import MuscleGroupTag from '../../components/MuscleGroupTag/MuscleGroupTag';
import { NextPageWithLayout } from '../_app';
import RouteGuard from '../../components/RouteGuard/RouteGuard';
import RouteLoader from '../../components/RouteLoader/RouteLoader';
import { ScheduledWorkoutExercise } from '@prisma/client';
import { ScheduledWorkoutExerciseWithExercise } from '../../types/ScheduledWorkoutExercise';
import { ScheduledWorkoutWithExerciseInSchedulesWithExercise } from '../../types/ScheduledWorkout';
import classNames from 'classnames';
import { moveItemInArray } from '../../utils/array-helpers';
import styles from './ScheduleWorkout.module.scss';
import useFetchWith403Redirect from '../../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../../utils/use-head-with-title';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const ScheduleWorkout: NextPageWithLayout = () => {
  const router = useRouter();

  const scheduledWorkoutId = router.query.id as string;

  const fetcher = useFetchWith403Redirect();

  const { data, error } =
    useSWR<ScheduledWorkoutWithExerciseInSchedulesWithExercise>(
      router.isReady ? `/api/schedule/workout/${scheduledWorkoutId}` : null,
      fetcher
    );

  const head = useHeadWithTitle(`Edit Schedule`);

  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (!!data) {
      setNickname(data.nickname);
    }
  }, [data]);

  const persistNickname = useCallback(() => {
    fetch(`/api/schedule/workout/nickname`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: scheduledWorkoutId,
        nickname,
      }),
    });
  }, [nickname, scheduledWorkoutId]);

  const [addExercisePickerVisible, setAddExercisePickerVisible] =
    useState(false);

  const onExerciseAddResult = useCallback(
    (exerciseId: string | undefined) => {
      if (typeof exerciseId === 'string') {
        fetch(`/api/schedule/workout/exercise`, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            scheduledWorkoutId,
            exerciseId,
          }),
        });
      }
      setAddExercisePickerVisible(false);
    },
    [scheduledWorkoutId]
  );

  if (!data)
    return (
      <>
        {head}
        <RouteLoader />
      </>
    );

  return (
    <>
      <div className={styles.root}>
        {head}
        <>
          <h1>
            Edit Schedule <i className='fa-solid fa-chevron-right'></i> Day{' '}
            {data.orderNumber + 1}
          </h1>
          <div className={styles.main}>
            <div className={classNames(styles.nickname, 'fade-in')}>
              <h3>Workout Nickname</h3>
              <div className={styles.nicknameTip}>
                Add a nickname to help distinguish this workout
              </div>
              <input
                type='text'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onBlur={(e) => persistNickname()}
                placeholder='Enter a nickname...'
                spellCheck='false'
                autoCapitalize='words'
              />
            </div>
            {!!data.exercises.length ? (
              <>
                <h3 className={classNames(styles.exercisesTitle)}>Exercises</h3>
                <ScheduledWorkoutExercises
                  scheduledWorkoutId={scheduledWorkoutId}
                  scheduledWorkoutExercises={data.exercises}
                  addExercise={() => setAddExercisePickerVisible(true)}
                />
              </>
            ) : (
              <div className={classNames(styles.noExercises, 'fade-in')}>
                <span>
                  Here, you can build a workout schedule. Start by adding a day,
                  and adding some exercises.
                </span>
                <button
                  className={'standard-button primary'}
                  onClick={() => setAddExercisePickerVisible(true)}
                >
                  <i className='fa-solid fa-plus'></i>
                  Add Exercise
                </button>
              </div>
            )}
          </div>
          <div className={classNames(styles.actions, 'fade-in')}>
            <div className={styles.autoSaveTip}>
              <i className='fa-solid fa-circle-info'></i>
              Changes saved automatically
            </div>
            <Link href={`/schedule`}>
              <a className='standard-button primary slim'>
                <i className='fa-solid fa-check'></i>
                Done
              </a>
            </Link>
          </div>
        </>
      </div>
      {!!addExercisePickerVisible && (
        <ExercisePickerBottomSheet onResult={onExerciseAddResult} />
      )}
    </>
  );
};

ScheduleWorkout.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>
    <RouteGuard>{page}</RouteGuard>
  </AppBarWithAppHeaderLayout>
);

export default ScheduleWorkout;

interface ScheduledWorkoutExercisesProps {
  scheduledWorkoutId: string;
  scheduledWorkoutExercises: ScheduledWorkoutExerciseWithExercise[];
  addExercise: () => void;
}

function ScheduledWorkoutExercises({
  scheduledWorkoutId,
  scheduledWorkoutExercises: scheduledWorkoutExercisesUnmemoized,
  addExercise,
}: ScheduledWorkoutExercisesProps) {
  const [scheduledWorkoutExercises, setScheduledWorkoutExercises] = useState(
    scheduledWorkoutExercisesUnmemoized
  );

  useEffect(() => {
    setScheduledWorkoutExercises(scheduledWorkoutExercisesUnmemoized);
  }, [scheduledWorkoutExercisesUnmemoized]);

  const onDragEnd = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) {
        return;
      }
      if (destination.index === source.index) {
        return;
      }
      const id = scheduledWorkoutExercises[source.index].id;
      const reorderedArray = moveItemInArray(
        scheduledWorkoutExercises,
        source.index,
        destination.index
      );
      setScheduledWorkoutExercises(reorderedArray);
      fetch(`/api/schedule/workout/exercise/move`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          from: source.index,
          to: destination.index,
          id,
        }),
      });
    },
    [scheduledWorkoutExercises]
  );

  const del = useCallback(async (id: string) => {
    await fetch(`/api/schedule/workout/exercise/${id}`, { method: 'DELETE' });
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='exercises'>
          {(provided) => (
            <div
              ref={provided.innerRef}
              className={classNames(styles.exercises, 'fade-in')}
              {...provided.droppableProps}
            >
              {scheduledWorkoutExercises.map(
                (scheduledWorkoutExercise, index) => (
                  <Draggable
                    key={scheduledWorkoutExercise.id}
                    draggableId={scheduledWorkoutExercise.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={styles.exercise}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          className={styles.exerciseHandle}
                          {...provided.dragHandleProps}
                        >
                          <i className='fa-solid fa-grip-lines'></i>
                        </div>
                        <div className={classNames(styles.exerciseBody)}>
                          <div className={styles.exerciseBodyLeft}>
                            <div className={styles.numberAndName}>
                              {scheduledWorkoutExercise.exercise.name}
                            </div>
                            <div className={styles.muscleGroups}>
                              {[
                                scheduledWorkoutExercise.exercise
                                  .primaryMuscleGroup,
                                ...scheduledWorkoutExercise.exercise
                                  .secondaryMuscleGroups,
                              ].map((muscleGroup) => (
                                <MuscleGroupTag
                                  key={muscleGroup}
                                  muscleGroup={muscleGroup}
                                />
                              ))}
                            </div>
                          </div>
                          <button
                            className={classNames(
                              styles.exerciseBodyLeftDelete,
                              'standard-button danger slim'
                            )}
                            onClick={() => {
                              del(scheduledWorkoutExercise.id);
                            }}
                          >
                            <i className='fa-solid fa-trash'></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              )}
              {provided.placeholder}
              <div className={styles.addActions}>
                <button
                  className='standard-button highlighted outlined slim'
                  onClick={() => addExercise()}
                >
                  <i className='fa-solid fa-plus'></i>
                  Add Exercise
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
