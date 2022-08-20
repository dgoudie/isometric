import { ExerciseType, IWorkoutExerciseSet } from '@dgoudie/isometric-types';
import React, { ReactNode, useMemo } from 'react';
import { intervalToDuration, secondsToMilliseconds } from 'date-fns';

import classNames from 'classnames';
import styles from './SetView.module.scss';

interface Props {
  exerciseType: ExerciseType;
  sets: IWorkoutExerciseSet[];
  className?: string;
}

export default function SetView({ exerciseType, sets, className }: Props) {
  return (
    <div className={classNames(styles.root, className)}>
      {sets.map((set, index) => (
        <div key={index} className={styles.set}>
          <SetBadge exerciseType={exerciseType} set={set} />
        </div>
      ))}
    </div>
  );
}

interface SetBadgeProps {
  set: IWorkoutExerciseSet;
}

function SetBadge({
  exerciseType,
  set,
}: SetBadgeProps & { exerciseType: ExerciseType }) {
  switch (exerciseType) {
    case 'timed': {
      return <TimedBadge set={set} />;
    }
    case 'rep_based': {
      return <RepBasedBadge set={set} />;
    }
    default: {
      return <WeightedSetBadge set={set} />;
    }
  }
}

function WeightedSetBadge({ set }: SetBadgeProps) {
  return (
    <>
      {set.repetitions} <i className='fa-solid fa-xmark'></i>{' '}
      {set.resistanceInPounds} lbs
    </>
  );
}

function RepBasedBadge({ set }: SetBadgeProps) {
  return <>{set.repetitions} reps</>;
}

function TimedBadge({ set }: SetBadgeProps) {
  const formattedTime = useMemo(() => {
    const duration = intervalToDuration({
      start: 0,
      end: secondsToMilliseconds(set.timeInSeconds!),
    });
    if (!duration.seconds) {
      return `${duration.minutes} minutes`;
    }
    return `${duration.minutes}m ${duration.seconds
      ?.toString()
      .padStart(2, '0')}s`;
  }, [set]);
  return <>{formattedTime}</>;
}
