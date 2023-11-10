import {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import Link from 'next/link';
import { MdCircularProgress } from '../components/material/MdCircularProgress';
import { MdFilledButton } from '../components/material/MdFilledButton';
import { MdFilledTonalButton } from '../components/material/MdFilledTonalButton';
import { MdIcon } from '../components/material/MdIcon';
import { MdIconButton } from '../components/material/MdStandardIconButton';
import { MdMenu } from '../components/material/MdMenu';
import { MdMenuItem } from '../components/material/MdMenuItem';
import { MdTextButton } from '../components/material/MdTextButton';
import MuscleGroupTag from '../components/MuscleGroupTag/MuscleGroupTag';
import { NextDaySchedule } from '../database/domains/scheduled_workout';
import { NextPageWithLayout } from './_app';
import { Prisma } from '@prisma/client';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import { ScheduledWorkoutWithExerciseInSchedulesWithExercise } from '../types/ScheduledWorkout';
import SelectScheduledWorkoutBottomSheet from '../components/BottomSheet/components/SelectScheduledWorkoutBottomSheet/SelectScheduledWorkoutBottomSheet';
import { WorkoutContext } from '../providers/Workout/Workout';
import { MdMenu as _MdMenu } from '@material/web/menu/menu';
import classNames from 'classnames';
import { getGreeting } from '../utils/get-greeting';
import { secondsToMinutes } from 'date-fns';
import styles from './Dashboard.module.scss';
import { useFetchJSON } from '../utils/fetch-json';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import useSWR from 'swr';

const TIME_PER_SET = 60;
export const BREAK_TIME = 120;

const Dashboard: NextPageWithLayout = () => {
  const [greeting, setGreeting] = useState('...');

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  const fetcher = useFetchJSON();

  const { data: schedule, error } = useSWR<NextDaySchedule>(
    `/api/schedule/upcoming`,
    fetcher
  );

  const { data: scheduledWorkouts, error: workoutsError } = useSWR<
    ScheduledWorkoutWithExerciseInSchedulesWithExercise[]
  >(`/api/schedule/workouts`, fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 0,
  });

  const dayDurationInSeconds = useMemo(() => {
    if (!schedule?.day) {
      return 0;
    }
    return schedule.day.exercises
      .map(
        (exerciseInSchedule) =>
          (BREAK_TIME + TIME_PER_SET) * exerciseInSchedule.exercise.setCount
      )
      .reduce((sum, exerciseDuration) => sum + exerciseDuration, 0);
  }, [schedule]);

  const setCount = useMemo(() => {
    if (!schedule?.day) {
      return 0;
    }
    return schedule.day.exercises
      .map((exerciseInSchedule) => exerciseInSchedule.exercise.setCount)
      .reduce((sum, exerciseDuration) => sum + exerciseDuration, 0);
  }, [schedule]);

  const dayDurationInMinutes = useMemo(
    () => secondsToMinutes(dayDurationInSeconds ?? 0),
    [dayDurationInSeconds]
  );

  const { startWorkout } = useContext(WorkoutContext);

  const head = useHeadWithTitle('Dashboard');

  const [selectDayBottomSheetVisible, setSelectDayBottomSheetVisible] =
    useState(false);

  const onDaySelected = useCallback(
    (result: number | undefined) => {
      setSelectDayBottomSheetVisible(false);
      if (typeof result === 'number') {
        startWorkout(result);
      }
    },
    [startWorkout]
  );

  const menuAnchorRef = createRef<HTMLDivElement>();
  const menuRef = createRef<_MdMenu>();

  const [startLoading, setStartLoading] = useState(false);

  useEffect(() => {
    if (!!menuAnchorRef.current && !!menuRef.current) {
      menuRef.current.anchorElement = menuAnchorRef.current;
    }
  }, [menuAnchorRef, menuRef]);

  if (error) throw error;
  if (workoutsError) throw workoutsError;

  if (!schedule)
    return (
      <>
        {head}
        <RouteLoader />
      </>
    );

  if (!schedule.day) {
    return (
      <div className={styles.wrapper}>
        {head}
        <h1>{greeting}</h1>
        <div className={styles.root}>
          <div className={styles.noSchedule}>
            <i className='fa-solid fa-warning'></i>
            <span>
              You have not yet built a workout schedule. To create one, click
              the &apos;Edit Schedule&apos; button below.
            </span>
          </div>
          <div className={styles.actions}>
            <Link href={'/schedule'} draggable='false'>
              <MdTextButton className={styles.editPlanButton}>
                <MdIcon slot='icon'>calendar_month</MdIcon>
                Edit Plan
              </MdTextButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        {head}
        <h1>{greeting}</h1>
        <div className={styles.root}>
          <div className={styles.day}>
            <div className={styles.dayHeader}>
              <div className={styles.dayHeaderNumber}>
                <div>
                  Day {schedule.day.orderNumber + 1}/{schedule.dayCount}
                </div>
                <div>{schedule.day.nickname}</div>
              </div>
              <div className={styles.dayHeaderMeta}>
                <HeaderItem
                  title='Duration'
                  value={dayDurationInMinutes}
                  suffix='mins'
                />
                <HeaderItem
                  title='Exercises'
                  value={schedule.day.exercises.length}
                />
                <HeaderItem title='Sets' value={setCount!} />
              </div>
            </div>
            <div className={styles.exercises}>
              {schedule.day.exercises.map((exerciseInSchedule) => (
                <ExerciseItem
                  key={exerciseInSchedule.id}
                  scheduledWorkoutWithExercise={exerciseInSchedule}
                />
              ))}
            </div>
          </div>
          <div className={styles.actions}>
            <Link href={'/schedule'} draggable='false'>
              <MdTextButton className={styles.editPlanButton}>
                <MdIcon slot='icon'>calendar_month</MdIcon>
                Edit Plan
              </MdTextButton>
            </Link>
            {!startLoading ? (
              <MdFilledButton
                onClick={() => {
                  startWorkout();
                  setStartLoading(true);
                }}
                className={styles.startButton}
              >
                <MdIcon slot='icon'>sprint</MdIcon>
                Start Day {schedule.day.orderNumber + 1}
              </MdFilledButton>
            ) : (
              <MdFilledButton
                disabled
                className={classNames(styles.startButton, 'loading-button')}
              >
                <MdCircularProgress indeterminate />
              </MdFilledButton>
            )}
            <div className={styles.actionsMenu} ref={menuAnchorRef}>
              <MdIconButton onClick={() => menuRef.current?.show()}>
                <MdIcon>more_vert</MdIcon>
              </MdIconButton>
              <MdMenu
                ref={menuRef}
                anchorElement={menuAnchorRef.current}
                anchorCorner='start-end'
                menuCorner='end-end'
                className={styles.actionsMenuMenu}
              >
                <MdMenuItem
                  onClick={() => setSelectDayBottomSheetVisible(true)}
                >
                  <div slot='headline'>Pick a different day</div>
                </MdMenuItem>
              </MdMenu>
            </div>
          </div>
        </div>
      </div>
      {selectDayBottomSheetVisible && !!scheduledWorkouts && (
        <SelectScheduledWorkoutBottomSheet
          onResult={onDaySelected}
          days={scheduledWorkouts}
        />
      )}
    </>
  );
};

Dashboard.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>{page}</AppBarWithAppHeaderLayout>
);

export default Dashboard;

interface HeaderItemProps {
  title: string;
  value: string | number;
  suffix?: string;
}

function HeaderItem({ title, value, suffix }: HeaderItemProps) {
  return (
    <div className={styles.headerItem}>
      <div className={styles.headerItemTitle}>{title}</div>
      <div className={styles.headerItemValue}>
        {value}
        {suffix && (
          <span className={styles.headerItemValueSuffix}>{suffix}</span>
        )}
      </div>
    </div>
  );
}

const ScheduledWorkoutWithExercise =
  Prisma.validator<Prisma.ScheduledWorkoutExerciseArgs>()({
    include: {
      exercise: true,
    },
  });

export type ScheduledWorkoutWithExercise =
  Prisma.ScheduledWorkoutExerciseGetPayload<
    typeof ScheduledWorkoutWithExercise
  >;

interface ExerciseItemProps {
  scheduledWorkoutWithExercise: ScheduledWorkoutWithExercise;
}

function ExerciseItem({ scheduledWorkoutWithExercise }: ExerciseItemProps) {
  const duration = useMemo(() => {
    switch (scheduledWorkoutWithExercise.exercise.exerciseType) {
      case 'rep_based': {
        return <>{scheduledWorkoutWithExercise.exercise.setCount} sets</>;
      }
      case 'timed': {
        if (scheduledWorkoutWithExercise.exercise.setCount < 2) {
          return (
            <>
              {secondsToMinutes(
                scheduledWorkoutWithExercise.exercise.timePerSetInSeconds!
              )}{' '}
              minutes
            </>
          );
        }
        return (
          <>
            {scheduledWorkoutWithExercise.exercise.setCount} sets —{' '}
            {secondsToMinutes(
              scheduledWorkoutWithExercise.exercise.timePerSetInSeconds!
            )}{' '}
            Minutes
          </>
        );
      }
      default: {
        return (
          <>
            {scheduledWorkoutWithExercise.exercise.setCount} sets,{' '}
            {
              scheduledWorkoutWithExercise.exercise
                .minimumRecommendedRepetitions
            }
            -
            {
              scheduledWorkoutWithExercise.exercise
                .maximumRecommendedRepetitions
            }{' '}
            reps
          </>
        );
      }
    }
  }, [scheduledWorkoutWithExercise]);

  return (
    <div className={styles.exercise}>
      <div className={styles.exerciseName}>
        {scheduledWorkoutWithExercise.exercise.name}
      </div>
      <div className={styles.exerciseGroup}>
        <MuscleGroupTag
          muscleGroup={scheduledWorkoutWithExercise.exercise.primaryMuscleGroup}
        />
      </div>
      <div className={styles.exerciseDuration}>{duration}</div>
    </div>
  );
}
