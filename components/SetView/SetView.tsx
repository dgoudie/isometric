import {
  ActiveWorkoutExerciseSet,
  ExerciseType,
  FinishedWorkoutExerciseSet,
} from '@prisma/client';
import { intervalToDuration, secondsToMilliseconds } from 'date-fns';
import { useCallback, useMemo } from 'react';

import { MdAssistChip } from '../material/MdAssistChip';
import { MdChipSet } from '../material/MdChipSet';
import { MdFilterChip } from '../material/MdAssistChip copy 2';
import classNames from 'classnames';
import styles from './SetView.module.scss';

interface Props {
  exerciseType: ExerciseType;
  sets: (FinishedWorkoutExerciseSet | ActiveWorkoutExerciseSet)[];
  className?: string;
}

export default function SetView({ exerciseType, sets, className }: Props) {
  const formatTime = useCallback((set: (typeof sets)[0]) => {
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
  }, []);

  const getLabel = useCallback(
    (set: (typeof sets)[0]) => {
      let label = '';
      switch (exerciseType) {
        case 'timed': {
          label = formatTime(set);
          break;
        }
        case 'rep_based': {
          label = `${set.repetitions} reps`;
          break;
        }
        default: {
          label = `${set.repetitions} \u00D7 ${set.resistanceInPounds} lbs`;
          break;
        }
      }
      return label;
    },
    [exerciseType, formatTime]
  );

  return (
    <MdChipSet>
      {sets.map((set, index) => (
        <MdAssistChip key={index} label={getLabel(set)} />
      ))}
    </MdChipSet>
  );
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
  set: FinishedWorkoutExerciseSet | ActiveWorkoutExerciseSet;
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
