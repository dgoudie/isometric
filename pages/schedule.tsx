import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { useCallback, useEffect, useMemo, useState } from 'react';

import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { ExerciseMuscleGroup } from '@prisma/client';
import Link from 'next/link';
import LoadingButton from '../components/LoadingButton/LoadingButton';
import MuscleGroupTag from '../components/MuscleGroupTag/MuscleGroupTag';
import { NextPageWithLayout } from './_app';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import { ScheduledWorkoutWithExerciseInSchedulesWithExercise } from '../types/ScheduledWorkout';
import classNames from 'classnames';
import { moveItemInArray } from '../utils/array-helpers';
import styles from './Schedule.module.scss';
import { useFetchJSONWith403Redirect } from '../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const url = `/api/schedule/workouts`;

const WorkoutPlan: NextPageWithLayout = () => {
  const fetcher = useFetchJSONWith403Redirect();

  const { data: scheduledWorkouts, error: fetchScheduleError } = useSWR<
    ScheduledWorkoutWithExerciseInSchedulesWithExercise[]
  >(url, fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 0,
  });

  const head = useHeadWithTitle(`Edit Schedule`);

  const router = useRouter();

  const addNewDay = useCallback(async () => {
    const newScheduleWorkoutId = await fetch(`/api/schedule/workout`, {
      method: 'PUT',
    }).then((res) => res.text());
    router.push(`/schedule/${newScheduleWorkoutId}`);
  }, [router]);

  if (!scheduledWorkouts) {
    return <RouteLoader />;
  }

  if (!scheduledWorkouts.length) {
    return (
      <>
        <h1>Schedule Builder</h1>
        <div className={classNames(styles.noDays, 'fade-in')}>
          {head}
          <span>
            Here, you can build a workout schedule. Start by adding a day, and
            adding some exercises.
          </span>
          <LoadingButton
            className={'standard-button primary'}
            onClick={addNewDay}
          >
            <i className='fa-solid fa-plus'></i>
            Add New Day
          </LoadingButton>
        </div>
      </>
    );
  }

  return (
    <div className={styles.root}>
      {head}
      <>
        <h1>Schedule Builder</h1>
        <ScheduledWorkouts
          scheduledWorkouts={scheduledWorkouts}
          addNewDay={addNewDay}
        />
        <div className={classNames(styles.actions, 'fade-in')}>
          <div className={styles.autoSaveTip}>
            <i className='fa-solid fa-circle-info'></i>
            Changes saved automatically
          </div>
          <Link href={`/dashboard`}>
            <a className='standard-button primary slim'>
              <i className='fa-solid fa-check'></i>
              Done
            </a>
          </Link>
        </div>
      </>
    </div>
  );
};

WorkoutPlan.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>
    <RouteGuard>{page}</RouteGuard>
  </AppBarWithAppHeaderLayout>
);

export default WorkoutPlan;

interface ScheduledWorkoutsProps {
  scheduledWorkouts: ScheduledWorkoutWithExerciseInSchedulesWithExercise[];
  addNewDay: () => void;
}

function ScheduledWorkouts({
  scheduledWorkouts: scheduledWorkoutsUnmemoized,
  addNewDay,
}: ScheduledWorkoutsProps) {
  const [scheduledWorkouts, setScheduledWorkouts] = useState(
    scheduledWorkoutsUnmemoized
  );

  const [expandedWorkoutIds, setExpandedWorkoutIds] = useState(
    new Set<string>()
  );

  useEffect(() => {
    setScheduledWorkouts(scheduledWorkoutsUnmemoized);
    const idsAsSet = new Set(scheduledWorkoutsUnmemoized.map((sw) => sw.id));
    setExpandedWorkoutIds(
      new Set(
        Array.from(expandedWorkoutIds).filter((expandedId) =>
          idsAsSet.has(expandedId)
        )
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduledWorkoutsUnmemoized]);

  const onDragEnd = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) {
        return;
      }
      if (destination.index === source.index) {
        return;
      }
      const id = scheduledWorkouts[source.index].id;
      const reorderedArray = moveItemInArray(
        scheduledWorkouts,
        source.index,
        destination.index
      );
      setScheduledWorkouts(reorderedArray);
      fetch(`/api/schedule/workout/move`, {
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
    [scheduledWorkouts]
  );

  const copy = useCallback(async (id: string) => {
    await fetch(`/api/schedule/workout?copy=${id}`, { method: 'PUT' });
  }, []);

  const del = useCallback(async (id: string) => {
    await fetch(`/api/schedule/workout/${id}`, { method: 'DELETE' });
  }, []);

  const expand = useCallback(
    (id: string) => {
      if (expandedWorkoutIds.has(id)) {
        expandedWorkoutIds.delete(id);
      } else {
        expandedWorkoutIds.add(id);
      }
      setExpandedWorkoutIds(new Set(Array.from(expandedWorkoutIds)));
    },
    [expandedWorkoutIds]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='workout_plan_days'>
        {(provided) => (
          <div
            ref={provided.innerRef}
            className={classNames(styles.workouts, 'fade-in')}
            {...provided.droppableProps}
          >
            {scheduledWorkouts.map((scheduledWorkout, index) => (
              <Draggable
                key={scheduledWorkout.id}
                draggableId={scheduledWorkout.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={classNames(
                      styles.workout,
                      expandedWorkoutIds.has(scheduledWorkout.id) &&
                        styles.expanded
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={styles.workoutHandle}
                      {...provided.dragHandleProps}
                    >
                      <i className='fa-solid fa-grip-lines'></i>
                    </div>
                    <div className={classNames(styles.workoutBody)}>
                      <button onClick={() => expand(scheduledWorkout.id)}>
                        <div className={styles.workoutBodyUpper}>
                          <div className={styles.workoutBodyUpperLeft}>
                            <div className={styles.numberAndName}>
                              Day {index + 1} -{' '}
                              {scheduledWorkout.nickname ? (
                                scheduledWorkout.nickname
                              ) : (
                                <i>No Name</i>
                              )}
                            </div>
                            <ScheduledWorkoutMuscleGroups
                              scheduledWorkout={scheduledWorkout}
                            />
                          </div>
                          <div
                            className={classNames(
                              styles.workoutBodyUpperArrow,
                              expandedWorkoutIds.has(scheduledWorkout.id) &&
                                styles.expanded
                            )}
                          >
                            <i className='fa-solid fa-chevron-left'></i>
                          </div>
                        </div>
                      </button>

                      <div className={styles.workoutBodyLower}>
                        <Link href={`/schedule/${scheduledWorkout.id}`}>
                          <a className='standard-button slim primary'>
                            <i className='fa-solid fa-edit'></i>Edit
                          </a>
                        </Link>
                        <button
                          className='standard-button slim'
                          onClick={() => {
                            copy(scheduledWorkout.id);
                            expand(scheduledWorkout.id);
                          }}
                        >
                          <i className='fa-solid fa-copy'></i>Copy
                        </button>
                        <button
                          className='standard-button danger slim'
                          onClick={() => {
                            del(scheduledWorkout.id);
                            expand(scheduledWorkout.id);
                          }}
                        >
                          <i className='fa-solid fa-trash'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <div className={styles.addActions}>
              <LoadingButton
                className='standard-button highlighted outlined slim'
                onClick={addNewDay}
              >
                <i className='fa-solid fa-plus'></i>
                Add New Day
              </LoadingButton>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

function ScheduledWorkoutMuscleGroups({
  scheduledWorkout,
}: {
  scheduledWorkout: ScheduledWorkoutWithExerciseInSchedulesWithExercise;
}) {
  const muscleGroups = useMemo(() => {
    const muscleGroupToCountMap = new Map<ExerciseMuscleGroup, number>(
      Object.keys(ExerciseMuscleGroup).map((group) => [
        group as ExerciseMuscleGroup,
        0,
      ])
    );
    scheduledWorkout.exercises.forEach(({ exercise }) => {
      muscleGroupToCountMap.set(
        exercise.primaryMuscleGroup,
        muscleGroupToCountMap.get(exercise.primaryMuscleGroup)! + 2
      );
      exercise.secondaryMuscleGroups.forEach((group) => {
        muscleGroupToCountMap.set(group, muscleGroupToCountMap.get(group)! + 1);
      });
    });
    return Array.from(muscleGroupToCountMap.entries())
      .filter(([_group, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([group]) => group)
      .slice(0, 3);
  }, [scheduledWorkout]);
  return (
    <div className={styles.muscleGroups}>
      {!!muscleGroups.length ? (
        muscleGroups.map((group) => (
          <MuscleGroupTag key={group} muscleGroup={group} />
        ))
      ) : (
        <i className={styles.none}>No exercises specified...</i>
      )}
    </div>
  );
}
