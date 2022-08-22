import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { IExercise, IScheduleDayWithExercises } from '@dgoudie/isometric-types';
import { useContext, useMemo } from 'react';

import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import AppBottomBar from '../components/AppBottomBar/AppBottomBar';
import AppHeader from '../components/AppHeader/AppHeader';
import Head from 'next/head';
import Link from 'next/link';
import MuscleGroupTag from '../components/MuscleGroupTag/MuscleGroupTag';
import { NextPageWithLayout } from './_app';
import { WorkoutContext } from '../providers/Workout/Workout';
import classNames from 'classnames';
import { getGreeting } from '../utils/get-greeting';
import { getNextDaySchedule } from '../database/domains/schedule';
import { getUserId } from '../utils/get-user-id';
import { normalizeBSON } from '../utils/normalize-bson';
import { secondsToMinutes } from 'date-fns';
import styles from '../styles/Dashboard.module.scss';
import { useHeadWithTitle } from '../utils/use-head-with-title';

const TIME_PER_SET = 60;

interface HomeProps {
  schedule: IScheduleDayWithExercises;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<HomeProps>> {
  const userId = await getUserId(context.req, context.res);
  if (!userId) {
    return { redirect: { destination: '/', permanent: false } };
  }
  return {
    props: getNextDaySchedule(userId)
      .then((schedule) => normalizeBSON(schedule))
      .then((schedule) => ({ schedule })),
  };
}

const Dashboard: NextPageWithLayout<HomeProps> = ({ schedule }) => {
  const greeting = useMemo(() => getGreeting(), []);

  const dayDurationInSeconds = useMemo(() => {
    return schedule.exercises
      .map(
        (exercise) =>
          (exercise.breakTimeInSeconds + TIME_PER_SET) * exercise.setCount
      )
      .reduce((sum, exerciseDuration) => sum + exerciseDuration, 0);
  }, [schedule]);

  const setCount = useMemo(() => {
    return schedule.exercises
      .map((exercise) => exercise.setCount)
      .reduce((sum, exerciseDuration) => sum + exerciseDuration, 0);
  }, [schedule]);

  const dayDurationInMinutes = useMemo(
    () => secondsToMinutes(dayDurationInSeconds ?? 0),
    [dayDurationInSeconds]
  );

  const { startWorkout } = useContext(WorkoutContext);

  const head = useHeadWithTitle('Dashboard');

  if (!schedule) {
    return (
      <div className={styles.wrapper}>
        {head}
        <h1>{greeting}</h1>
        <div className={styles.root}>
          <div className={styles.noSchedule}>
            <span>
              You have not yet built a workout plan. Start by creating one.
            </span>
            <Link href={'/workout-plan'}>
              <a className={'standard-button primary'} draggable={false}>
                <i className='fa-solid fa-calendar-week'></i>
                Edit Plan
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
      <h1>{greeting}</h1>
      <div className={styles.root}>
        <div className={classNames(styles.day, 'fade-in')}>
          <div className={styles.dayHeader}>
            <div className={styles.dayHeaderNumber}>
              <div>
                Day {schedule.dayNumber + 1}/{schedule.dayCount}
              </div>
              <div>{schedule.nickname}</div>
            </div>
            <div className={styles.dayHeaderMeta}>
              <HeaderItem
                title='Duration'
                value={dayDurationInMinutes}
                suffix='mins'
              />
              <HeaderItem title='Exercises' value={schedule.exercises.length} />
              <HeaderItem title='Sets' value={setCount!} />
            </div>
          </div>
          <div className={styles.exercises}>
            {schedule.exercises.map((exercise) => (
              <ExerciseItem key={exercise._id} exercise={exercise} />
            ))}
          </div>
        </div>
        <div className={styles.actions}>
          <Link href={'/workout-plan'}>
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
            Start Day {schedule.dayNumber + 1}
          </button>
        </div>
      </div>
    </div>
  );
};

Dashboard.getLayout = (page) => (
  <>
    <AppHeader />
    {page}
    <AppBottomBar />
  </>
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

interface ExerciseItemProps {
  exercise: IExercise;
}

function ExerciseItem({ exercise }: ExerciseItemProps) {
  const duration = useMemo(() => {
    switch (exercise.exerciseType) {
      case 'rep_based': {
        return <>{exercise.setCount} sets</>;
      }
      case 'timed': {
        if (exercise.setCount < 2) {
          return <>{secondsToMinutes(exercise.timePerSetInSeconds!)} minutes</>;
        }
        return (
          <>
            {exercise.setCount} sets —{' '}
            {secondsToMinutes(exercise.timePerSetInSeconds!)} Minutes
          </>
        );
      }
      default: {
        return (
          <>
            {exercise.setCount} sets, {exercise.minimumRecommendedRepetitions}-
            {exercise.maximumRecommendedRepetitions} reps
          </>
        );
      }
    }
  }, [exercise]);

  return (
    <div className={styles.exercise}>
      <div className={styles.exerciseName}>{exercise.name}</div>
      <div className={styles.exerciseGroup}>
        <MuscleGroupTag muscleGroup={exercise.primaryMuscleGroup} />
      </div>
      <div className={styles.exerciseDuration}>{duration}</div>
    </div>
  );
}