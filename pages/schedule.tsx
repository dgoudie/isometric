import { animated, config, useSprings } from 'react-spring';
import { useCallback, useRef, useState } from 'react';

import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import Link from 'next/link';
import { NextPageWithLayout } from './_app';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import { ScheduledWorkoutWithExerciseInSchedules } from '../types/ScheduledWorkout';
import clamp from '../utils/clamp';
import classNames from 'classnames';
import { moveItemInArray } from '../utils/array-helpers';
import styles from './Schedule.module.scss';
import { useDrag } from '@use-gesture/react';
import useFetchWith403Redirect from '../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const WorkoutPlan: NextPageWithLayout = () => {
  const fetcher = useFetchWith403Redirect();

  const { data: scheduledWorkouts, error: fetchScheduleError } = useSWR<
    ScheduledWorkoutWithExerciseInSchedules[]
  >('/api/schedule/workouts', fetcher);

  const head = useHeadWithTitle(`Edit Schedule`);

  const router = useRouter();

  const createDay = useCallback(async () => {
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
          <button className={'standard-button primary'} onClick={createDay}>
            <i className='fa-solid fa-plus'></i>
            Add Day
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
        <ScheduledWorkouts scheduledWorkouts={scheduledWorkouts} />
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

function ScheduledWorkouts({
  scheduledWorkouts,
}: {
  scheduledWorkouts: ScheduledWorkoutWithExerciseInSchedules[];
}) {
  const [expandedWorkoutIds, setExpandedWorkoutIds] = useState(
    new Set<string>()
  );

  const order = useRef(scheduledWorkouts.map((_, index) => index)); // Store indicies as a local ref, this represents the item order

  const fn = useCallback(
    (
      order: number[],
      active = false,
      originalIndex = 0,
      curIndex = 0,
      y = 0
    ) => {
      return (index: number) => {
        return active && index === originalIndex
          ? {
              y: curIndex * 64 + y,
              zIndex: 1,
              shadow: 5,
              immediate: (key: string) => key === 'zIndex',
              config: (key: string) =>
                key === 'y' ? config.stiff : config.default,
            }
          : {
              y: order.indexOf(index) * 64,
              zIndex: 0,
              shadow: 1,
              immediate: false,
            };
      };
    },
    []
  );

  const [springs, api] = useSprings(
    scheduledWorkouts.length,
    fn(order.current)
  ); // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);

    const curRow = clamp(
      Math.round((curIndex * 64 + y) / 64),
      0,
      scheduledWorkouts.length - 1
    );

    const newOrder = moveItemInArray(order.current, curIndex, curRow);

    api.start(fn(newOrder, active, originalIndex, curIndex, y)); // Feed springs new style data, they'll animate the view without causing a single render

    if (!active) order.current = newOrder;
  });
  return (
    <div className={classNames(styles.workouts, 'fade-in')}>
      {springs.map(({ zIndex, shadow, y }, i) => (
        <animated.div
          className={styles.workout}
          key={i}
          style={{
            zIndex,
            y,
          }}
        >
          <animated.div
            {...bind(i)}
            style={{
              boxShadow: shadow.to(
                (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
              ),
            }}
            className={styles.workoutHandle}
          >
            <i className='fa-solid fa-grip-lines'></i>
          </animated.div>
          <animated.div
            style={{
              boxShadow: shadow.to(
                (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
              ),
            }}
            className={styles.workoutBody}
          >
            {scheduledWorkouts[i].id}
          </animated.div>
        </animated.div>
      ))}
    </div>
  );
}
