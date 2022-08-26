import { Exercise, ExerciseInSchedule, Prisma } from '@prisma/client';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {
  NextDaySchedule,
  getNextDaySchedule,
} from '../database/domains/schedule';
import { useContext, useEffect, useMemo, useState } from 'react';

import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import Link from 'next/link';
import MuscleGroupTag from '../components/MuscleGroupTag/MuscleGroupTag';
import { NextPageWithLayout } from './_app';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import { WorkoutContext } from '../providers/Workout/Workout';
import classNames from 'classnames';
import { getGreeting } from '../utils/get-greeting';
import { secondsToMinutes } from 'date-fns';
import styles from './Dashboard.module.scss';
import useFetchWith403Redirect from '../utils/fetch-with-403-redirect';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import useSWR from 'swr';

const TIME_PER_SET = 60;
const BREAK_TIME = 120;

const Dashboard: NextPageWithLayout = () => {
  const [greeting, setGreeting] = useState('...');

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  const fetcher = useFetchWith403Redirect();

  const { data: schedule, error } = useSWR<NextDaySchedule>(
    `/api/schedule/upcoming`,
    fetcher
  );

  const dayDurationInSeconds = useMemo(() => {
    if (!schedule?.day) {
      return 0;
    }
    return schedule.day.exercises
      .map(
        (exerciseInSchedule) =>
          (BREAK_TIME + TIME_PER_SET) * exerciseInSchedule.setCount
      )
      .reduce((sum, exerciseDuration) => sum + exerciseDuration, 0);
  }, [schedule]);

  const setCount = useMemo(() => {
    if (!schedule?.day) {
      return 0;
    }
    return schedule.day.exercises
      .map((exerciseInSchedule) => exerciseInSchedule.setCount)
      .reduce((sum, exerciseDuration) => sum + exerciseDuration, 0);
  }, [schedule]);

  const dayDurationInMinutes = useMemo(
    () => secondsToMinutes(dayDurationInSeconds ?? 0),
    [dayDurationInSeconds]
  );

  const { startWorkout } = useContext(WorkoutContext);

  const head = useHeadWithTitle('Dashboard');

  if (error) throw error;

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
        <h1 className='fade-in'>{greeting}</h1>
        <div className={styles.root}>
          <div className={styles.noSchedule}>
            <span>
              You have not yet built a workout plan. Start by creating one.
            </span>
            <Link href={'/schedule'}>
              <a className={'standard-button primary'} draggable={false}>
                <i className='fa-solid fa-calendar-week'></i>
                Edit Schedule
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {head}
      <h1 className='fade-in'>{greeting}</h1>
      <div className={styles.root}>
        <div className={classNames(styles.day, 'fade-in')}>
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
                key={exerciseInSchedule.exerciseId}
                exerciseInSchedule={exerciseInSchedule}
              />
            ))}
          </div>
        </div>
        <div className={styles.actions}>
          <Link href={'/schedule'}>
            <a
              draggable='false'
              className={classNames('standard-button', styles.editPlanButton)}
            >
              <i className='fa-solid fa-calendar-week'></i>
              Edit Plan
            </a>
          </Link>
          <button
            type='button'
            onClick={() => startWorkout()}
            className={classNames('standard-button primary')}
          >
            <i className='fa-solid fa-person-walking'></i>
            Start Day {schedule.day.orderNumber + 1}
          </button>
        </div>
      </div>
    </div>
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

const ExerciseInScheduleWithExercise =
  Prisma.validator<Prisma.ExerciseInScheduleArgs>()({
    include: {
      exercise: true,
    },
  });

export type ExerciseInScheduleWithExercise =
  Prisma.ExerciseInScheduleGetPayload<typeof ExerciseInScheduleWithExercise>;

interface ExerciseItemProps {
  exerciseInSchedule: ExerciseInScheduleWithExercise;
}

function ExerciseItem({ exerciseInSchedule }: ExerciseItemProps) {
  const duration = useMemo(() => {
    switch (exerciseInSchedule.exercise.exerciseType) {
      case 'rep_based': {
        return <>{exerciseInSchedule.setCount} sets</>;
      }
      case 'timed': {
        if (exerciseInSchedule.setCount < 2) {
          return (
            <>
              {secondsToMinutes(exerciseInSchedule.timePerSetInSeconds!)}{' '}
              minutes
            </>
          );
        }
        return (
          <>
            {exerciseInSchedule.setCount} sets —{' '}
            {secondsToMinutes(exerciseInSchedule.timePerSetInSeconds!)} Minutes
          </>
        );
      }
      default: {
        return (
          <>
            {exerciseInSchedule.setCount} sets,{' '}
            {exerciseInSchedule.recommendedRepetitions}
          </>
        );
      }
    }
  }, [exerciseInSchedule]);

  return (
    <div className={styles.exercise}>
      <div className={styles.exerciseName}>
        {exerciseInSchedule.exercise.name}
      </div>
      <div className={styles.exerciseGroup}>
        <MuscleGroupTag
          muscleGroup={exerciseInSchedule.exercise.primaryMuscleGroup}
        />
      </div>
      <div className={styles.exerciseDuration}>{duration}</div>
    </div>
  );
}
