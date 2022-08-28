import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { ExerciseMuscleGroup } from '@prisma/client';
import Link from 'next/link';
import MuscleGroupTag from '../components/MuscleGroupTag/MuscleGroupTag';
import { NextPageWithLayout } from './_app';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import { ScheduledWorkoutWithExerciseInSchedulesWithExercise } from '../types/ScheduledWorkout';
import classNames from 'classnames';
import { moveItemInArray } from '../utils/array-helpers';
import styles from './Schedule.module.scss';
import useFetchWith403Redirect from '../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import { useRouter } from 'next/router';

const url = `/api/schedule/workouts`;

const WorkoutPlan: NextPageWithLayout = () => {
  const fetcher = useFetchWith403Redirect();

  const { data: scheduledWorkouts, error: fetchScheduleError } = useSWR<
    ScheduledWorkoutWithExerciseInSchedulesWithExercise[]
  >(url, fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 0,
  });

  const { mutate } = useSWRConfig();

  const head = useHeadWithTitle(`Edit Schedule`);

  const router = useRouter();

  const addNewDay = useCallback(async () => {
    const newScheduleWorkoutId = await fetch(`/api/schedule/workout`, {
      method: 'PUT',
    }).then((res) => res.text());
    router.replace(`/schedule/${newScheduleWorkoutId}`);
  }, [router]);

  if (!scheduledWorkouts) {
    return <RouteLoader />;
  }

  if (!scheduledWorkouts.length) {
    return (
      <>
        <h1>Schedule Builder</h1>
        <div className={styles.noDays}>
          {head}
          <span>
            Here, you can build a workout schedule. Start by adding a day, and
            adding some exercises.
          </span>
          <button className={'standard-button primary'} onClick={addNewDay}>
            <i className='fa-solid fa-plus'></i>
            Add New Day
          </button>
        </div>
      </>
    );
  }

  return (
    <div className={styles.root}>
      {head}
      <>
        <h1>Edit Schedule</h1>
        <ScheduledWorkouts
          scheduledWorkouts={scheduledWorkouts}
          addNewDay={addNewDay}
          refreshScheduledWorkouts={() => {
            mutate(url);
          }}
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
    <RouteGuard>
      <PageWrapper>{page}</PageWrapper>
    </RouteGuard>
  </AppBarWithAppHeaderLayout>
);

export default WorkoutPlan;

interface ScheduledWorkoutsProps {
  scheduledWorkouts: ScheduledWorkoutWithExerciseInSchedulesWithExercise[];
  addNewDay: () => void;
  refreshScheduledWorkouts: () => void;
}

function ScheduledWorkouts({
  scheduledWorkouts: scheduledWorkoutsUnmemoized,
  addNewDay,
  refreshScheduledWorkouts,
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
      const reorderedArray = moveItemInArray(
        scheduledWorkouts,
        source.index,
        destination.index
      );
      setScheduledWorkouts(reorderedArray);
      const scheduledWorkoutIds: string[] = reorderedArray.map(
        (item) => item.id
      );
      fetch(`/api/schedule/workout/move`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          scheduledWorkoutIds,
        }),
      });
    },
    [scheduledWorkouts]
  );

  const copy = useCallback(
    async (id: string) => {
      await fetch(`/api/schedule/workout?copy=${id}`, { method: 'PUT' });
      refreshScheduledWorkouts();
    },
    [refreshScheduledWorkouts]
  );

  const del = useCallback(
    async (id: string) => {
      await fetch(`/api/schedule/workout/${id}`, { method: 'DELETE' });
      refreshScheduledWorkouts();
    },
    [refreshScheduledWorkouts]
  );

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
                    <div className={classNames(styles.workoutBody, 'fade-in')}>
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
                        <button
                          className={classNames(
                            styles.workoutBodyUpperButton,
                            expandedWorkoutIds.has(scheduledWorkout.id) &&
                              styles.expanded
                          )}
                          onClick={() => expand(scheduledWorkout.id)}
                        >
                          <i className='fa-solid fa-chevron-left'></i>
                        </button>
                      </div>

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
              <button
                className='standard-button primary slim'
                onClick={addNewDay}
              >
                <i className='fa-solid fa-plus'></i>
                Add New Day
              </button>
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
