import { Exercise, WorkoutExerciseSet } from '@prisma/client';
import { IExercise, IWorkoutExerciseSet } from '@dgoudie/isometric-types';
import {
  addMilliseconds,
  differenceInMilliseconds,
  intervalToDuration,
  millisecondsToSeconds,
  secondsToMilliseconds,
} from 'date-fns';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { WorkoutContext } from '../../providers/Workout/Workout';
import classNames from 'classnames';
import { inputForceInteger } from '../../utils/input-force-integer';
import { inputSelectAllOnFocus } from '../../utils/input-select-all-on-focus';
import { showNotification } from '../../utils/notification';
import styles from './ActiveExerciseViewExerciseSet.module.scss';

interface Props {
  set: WorkoutExerciseSet;
  data: Exercise;
  exerciseSelected: boolean;
  setSelected: boolean;
  exerciseIndex: number;
  setIndex: number;
}
export default function ActiveExerciseViewExerciseSet(props: Props) {
  let children = <WeightedSet {...props} />;
  if (props.data.exerciseType === 'timed') {
    children = <TimedSet {...props} />;
  } else if (props.data.exerciseType === 'rep_based') {
    children = <RepBasedSet {...props} />;
  }
  return (
    <div
      className={classNames(
        styles.root,
        props.setSelected && styles.highlighted,
        props.set.complete && styles.completed
      )}
    >
      {children}
    </div>
  );
}

function WeightedSet({
  set,
  setSelected,
  data,
  exerciseSelected,
  exerciseIndex,
  setIndex,
}: Props) {
  const { persistSetComplete, persistSetRepetitions, persistSetResistance } =
    useContext(WorkoutContext);

  const resistanceInput = useRef<HTMLInputElement>(null);
  const repCountInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!exerciseSelected) {
      resistanceInput.current?.blur();
      repCountInput.current?.blur();
    }
  }, [resistanceInput, repCountInput, exerciseSelected]);

  useEffect(() => {
    resistanceInput.current &&
      (resistanceInput.current.value =
        set.resistanceInPounds?.toString() ?? '');
  }, [resistanceInput, set]);

  useEffect(() => {
    repCountInput.current &&
      (repCountInput.current.value = set.repetitions?.toString() ?? '');
  }, [repCountInput, set]);

  return (
    <div className={classNames(styles.set, styles.setTypeWeighted)}>
      <div className={styles.setInput}>
        <div className={styles.setInputWrapper}>
          <input
            ref={resistanceInput}
            type='number'
            placeholder='0'
            inputMode='numeric'
            onFocus={inputSelectAllOnFocus}
            onInput={inputForceInteger}
            onBlur={(e) =>
              persistSetResistance(
                exerciseIndex,
                setIndex,
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
          />
        </div>

        <span className={styles.setInputSuffix}>lbs</span>
      </div>
      <div className={styles.setInput}>
        <div className={styles.setInputWrapper}>
          <input
            ref={repCountInput}
            type='number'
            inputMode='numeric'
            placeholder={`${data.minimumRecommendedRepetitions}-${data.maximumRecommendedRepetitions}`}
            onFocus={inputSelectAllOnFocus}
            onInput={inputForceInteger}
            onBlur={(e) =>
              persistSetRepetitions(
                exerciseIndex,
                setIndex,
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
          />
        </div>
        <span className={styles.setInputSuffix}>reps</span>
      </div>
      <button
        disabled={!setSelected && !set.complete}
        type='button'
        onClick={() =>
          persistSetComplete(exerciseIndex, setIndex, !set.complete)
        }
        className={classNames(styles.setButton, styles.setButtonCompleted)}
      >
        <i className='fa-solid fa-check'></i>
      </button>
    </div>
  );
}

function TimedSet({ set, data, exerciseIndex, setIndex, setSelected }: Props) {
  const { persistSetComplete } = useContext(WorkoutContext);

  const millisecondsPerSet = useMemo(
    () => secondsToMilliseconds(data.timePerSetInSeconds!),
    [data]
  );

  const [millisecondsRemaining, setMillisecondsRemaining] =
    useState(millisecondsPerSet);

  const [paused, setPaused] = useState(true);
  const [intervalId, setIntervalId] = useState<number | undefined>();

  useEffect(() => {
    clearInterval(intervalId);
    if (!paused) {
      const endDate = addMilliseconds(new Date(), millisecondsRemaining);
      setIntervalId(
        setInterval(() => {
          const remaining = differenceInMilliseconds(endDate, new Date());
          if (remaining > 0) {
            setMillisecondsRemaining(remaining);
          } else {
            setMillisecondsRemaining(0);
            setPaused(true);
            showNotification('Time is up...');
          }
        }, 50) as unknown as number
      );
    }
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const secondsRemaining = useMemo(
    () => millisecondsToSeconds(millisecondsRemaining),
    [millisecondsRemaining]
  );

  const formattedTime = useMemo(() => {
    const duration = intervalToDuration({
      start: 0,
      end: secondsToMilliseconds(secondsRemaining),
    });
    return `${duration.minutes}:${duration.seconds
      ?.toString()
      .padStart(2, '0')}`;
  }, [secondsRemaining]);

  const percentageComplete = useMemo(() => {
    const percentage =
      (millisecondsPerSet - millisecondsRemaining) / millisecondsPerSet;
    return Math.round((percentage + Number.EPSILON) * 100) / 100;
  }, [millisecondsPerSet, millisecondsRemaining]);

  return (
    <div className={classNames(styles.set, styles.setTypeTimed)}>
      <div className={styles.timer}>
        <div className={styles.time}>{formattedTime}</div>
      </div>
      <button
        type='button'
        onClick={() => {
          setPaused(true);
          setMillisecondsRemaining(millisecondsPerSet);
        }}
        disabled={set.complete}
        className={classNames(styles.setButton, styles.setButtonStartStop)}
      >
        <i className='fa-solid fa-arrow-rotate-left'></i>
      </button>
      <button
        type='button'
        onClick={() => setPaused(!paused)}
        disabled={set.complete}
        className={classNames(styles.setButton, styles.setButtonStartStop)}
      >
        <i className={`fa-solid fa-${paused ? 'play' : 'pause'}`}></i>
      </button>
      <button
        type='button'
        onClick={() => {
          setPaused(true);
          persistSetComplete(exerciseIndex, setIndex, !set.complete);
        }}
        disabled={!setSelected && !set.complete}
        className={classNames(styles.setButton, styles.setButtonCompleted)}
      >
        <i className='fa-solid fa-check'></i>
      </button>
    </div>
  );
}

function RepBasedSet({
  set,
  setSelected,
  exerciseSelected,
  exerciseIndex,
  setIndex,
}: Props) {
  const { persistSetComplete, persistSetRepetitions } =
    useContext(WorkoutContext);
  const repCountInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!exerciseSelected) {
      repCountInput.current?.blur();
    }
  }, [repCountInput, exerciseSelected]);

  useEffect(() => {
    repCountInput.current &&
      (repCountInput.current.value = set.repetitions?.toString() ?? '');
  }, [repCountInput, set]);

  return (
    <div className={classNames(styles.set, styles.setTypeRepBased)}>
      <div className={styles.setInput}>
        <div className={styles.setInputWrapper}>
          <input
            ref={repCountInput}
            type='number'
            inputMode='numeric'
            placeholder='--'
            onFocus={inputSelectAllOnFocus}
            onInput={inputForceInteger}
            onBlur={(e) =>
              persistSetRepetitions(
                exerciseIndex,
                setIndex,
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
          />
        </div>
        <span className={styles.setInputSuffix}>reps</span>
      </div>
      <button
        type='button'
        onClick={() =>
          persistSetComplete(exerciseIndex, setIndex, !set.complete)
        }
        disabled={!setSelected && !set.complete}
        className={classNames(styles.setButton, styles.setButtonCompleted)}
      >
        <i className='fa-solid fa-check'></i>
      </button>
    </div>
  );
}
