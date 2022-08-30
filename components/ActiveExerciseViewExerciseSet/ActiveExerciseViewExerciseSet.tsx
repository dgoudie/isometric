import {
  addMilliseconds,
  differenceInMilliseconds,
  intervalToDuration,
  millisecondsToSeconds,
  secondsToMilliseconds,
} from 'date-fns';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { ActiveWorkoutExerciseSet } from '@prisma/client';
import { ActiveWorkoutExerciseWithSetsAndDetails } from '../../types/ActiveWorkoutExercise';
import { WorkoutContext } from '../../providers/Workout/Workout';
import classNames from 'classnames';
import { inputForceInteger } from '../../utils/input-force-integer';
import { inputSelectAllOnFocus } from '../../utils/input-select-all-on-focus';
import { showNotification } from '../../utils/notification';
import styles from './ActiveExerciseViewExerciseSet.module.scss';

interface Props {
  activeWorkoutExercise: ActiveWorkoutExerciseWithSetsAndDetails;
  set: ActiveWorkoutExerciseSet;
  exerciseIsActive: boolean;
  isActive: boolean;
  onChangedExceptCompleted: (set: ActiveWorkoutExerciseSet) => void;
  onCompleted: (complete: boolean) => void;
}
export default function ActiveExerciseViewExerciseSet(props: Props) {
  let children = <WeightedSet {...props} />;
  if (props.activeWorkoutExercise.exercise.exerciseType === 'timed') {
    children = <TimedSet {...props} />;
  } else if (
    props.activeWorkoutExercise.exercise.exerciseType === 'rep_based'
  ) {
    children = <RepBasedSet {...props} />;
  }
  return (
    <div
      className={classNames(
        styles.root,
        props.isActive && styles.highlighted,
        props.set.complete && styles.completed
      )}
    >
      {children}
    </div>
  );
}

function WeightedSet(props: Props) {
  const { persistSetComplete, persistSetRepetitions, persistSetResistance } =
    useContext(WorkoutContext);

  const resistanceInput = useRef<HTMLInputElement>(null);
  const repCountInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!props.exerciseIsActive) {
      resistanceInput.current?.blur();
      repCountInput.current?.blur();
    }
  }, [resistanceInput, repCountInput, props.exerciseIsActive]);

  useEffect(() => {
    resistanceInput.current &&
      (resistanceInput.current.value =
        props.set.resistanceInPounds?.toString() ?? '');
  }, [props.set.resistanceInPounds, resistanceInput]);

  useEffect(() => {
    repCountInput.current &&
      (repCountInput.current.value = props.set.repetitions?.toString() ?? '');
  }, [props.set.repetitions, repCountInput]);

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
            onBlur={(e) => {
              const resistanceInPounds = e.target.value
                ? parseInt(e.target.value)
                : null;
              persistSetResistance(
                props.activeWorkoutExercise.id,
                props.set.orderNumber,
                resistanceInPounds
              );
              props.onChangedExceptCompleted({
                ...props.set,
                resistanceInPounds,
              });
            }}
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
            placeholder={`${props.activeWorkoutExercise.exercise.maximumRecommendedRepetitions}-${props.activeWorkoutExercise.exercise.maximumRecommendedRepetitions}`}
            onFocus={inputSelectAllOnFocus}
            onInput={inputForceInteger}
            onBlur={(e) => {
              const repetitions = e.target.value
                ? parseInt(e.target.value)
                : null;
              persistSetRepetitions(
                props.activeWorkoutExercise.id,
                props.set.orderNumber,
                repetitions
              );
              props.onChangedExceptCompleted({ ...props.set, repetitions });
            }}
          />
        </div>
        <span className={styles.setInputSuffix}>reps</span>
      </div>
      <button
        disabled={!props.isActive && !props.set.complete}
        type='button'
        onClick={() => {
          props.onCompleted(!props.set.complete);
          persistSetComplete(
            props.activeWorkoutExercise.id,
            props.set.orderNumber,
            !props.set.complete
          );
        }}
        className={classNames(styles.setButton, styles.setButtonCompleted)}
      >
        <i className='fa-solid fa-check'></i>
      </button>
    </div>
  );
}

function TimedSet({
  activeWorkoutExercise,
  set,
  isActive,
  onCompleted,
}: Props) {
  const { persistSetComplete } = useContext(WorkoutContext);

  const millisecondsPerSet = useMemo(
    () =>
      secondsToMilliseconds(
        activeWorkoutExercise.exercise.timePerSetInSeconds!
      ),
    [activeWorkoutExercise]
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
          onCompleted(!set.complete);
          persistSetComplete(
            activeWorkoutExercise.id,
            set.orderNumber,
            !set.complete
          );
        }}
        disabled={!isActive && !set.complete}
        className={classNames(styles.setButton, styles.setButtonCompleted)}
      >
        <i className='fa-solid fa-check'></i>
      </button>
    </div>
  );
}

function RepBasedSet(props: Props) {
  const { persistSetComplete, persistSetRepetitions } =
    useContext(WorkoutContext);
  const repCountInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!props.exerciseIsActive) {
      repCountInput.current?.blur();
    }
  }, [repCountInput, props.exerciseIsActive]);

  useEffect(() => {
    repCountInput.current &&
      (repCountInput.current.value = props.set.repetitions?.toString() ?? '');
  }, [props.set.repetitions, repCountInput]);

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
            onBlur={(e) => {
              const repetitions = e.target.value
                ? parseInt(e.target.value)
                : null;
              persistSetRepetitions(
                props.activeWorkoutExercise.id,
                props.set.orderNumber,
                repetitions
              );
              props.onChangedExceptCompleted({ ...props.set, repetitions });
            }}
          />
        </div>
        <span className={styles.setInputSuffix}>reps</span>
      </div>
      <button
        type='button'
        onClick={() => {
          persistSetComplete(
            props.activeWorkoutExercise.id,
            props.set.orderNumber,
            !props.set.complete
          );
          props.onCompleted(!props.set.complete);
        }}
        disabled={!props.isActive && !props.set.complete}
        className={classNames(styles.setButton, styles.setButtonCompleted)}
      >
        <i className='fa-solid fa-check'></i>
      </button>
    </div>
  );
}
