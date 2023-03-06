import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  addSeconds,
  differenceInMilliseconds,
  intervalToDuration,
  millisecondsToSeconds,
  secondsToMilliseconds,
} from 'date-fns';
import { setupNotifications, showNotification } from '../../utils/notification';

import { BREAK_TIME } from '../../pages/dashboard';
import { CSSTransition } from 'react-transition-group';
import { ExerciseMuscleGroup } from '@prisma/client';
import FocusTrap from 'focus-trap-react';
import LoadingButton from '../../components/LoadingButton/LoadingButton';
import MuscleGroupTag from '../../components/MuscleGroupTag/MuscleGroupTag';
import Portal from '../../components/Portal/Portal';
import { WorkoutContext } from '../Workout/Workout';
import classNames from 'classnames';
import styles from './AfterExerciseTimer.module.scss';

type AfterExerciseTimerContextType = {
  show: (onFinished?: () => void) => void;
  showAfterLastSet: (
    nextExerciseName: string,
    nextExerciseMuscleGroup: ExerciseMuscleGroup,
    onFinished?: () => void
  ) => void;
  showAfterLastExercise: (onFinished?: () => void) => void;
  cancel: () => void;
  isOpenAndMinimized: boolean;
};

export const AfterExerciseTimerContext =
  createContext<AfterExerciseTimerContextType>({
    show: () => undefined,
    showAfterLastSet: () => undefined,
    showAfterLastExercise: () => undefined,
    cancel: () => undefined,
    isOpenAndMinimized: false,
  });

const TIMEOUT = 250;

export default function AfterExerciseTimerProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const previousEndDate = useRef<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [minimized, setMinimized] = useState(false);
  const [onFinishedCallbacks, setOnFinishedCallbacks] = useState<
    (() => void)[]
  >([]);
  const [type, setType] = useState<
    'AFTER_SET' | 'AFTER_EXERCISE' | 'END_OF_WORKOUT'
  >('AFTER_SET');
  const [nextExerciseName, setNextExerciseName] = useState('');
  const [nextExerciseMuscleGroup, setNextExerciseMuscleGroup] =
    useState<ExerciseMuscleGroup>('cardio');
  const [millisecondsRemaining, setMillisecondsRemaining] = useState(0);
  const intervalId = useRef<number>();

  useEffect(() => {
    if (!!endDate) {
      intervalId.current = setInterval(() => {
        const remaining = differenceInMilliseconds(endDate, new Date());
        if (remaining > 0) {
          setMillisecondsRemaining(remaining);
        } else {
          showNotification('Time is up...');
          setEndDate(undefined);
        }
      }, 100) as unknown as number;
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [endDate]);

  useEffect(() => {
    if (!!previousEndDate.current && !endDate) {
      if (onFinishedCallbacks.length) {
        onFinishedCallbacks.forEach((onFinished) => onFinished());
        setOnFinishedCallbacks([]);
      }
    }
  }, [endDate, onFinishedCallbacks]);

  useEffect(() => {
    previousEndDate.current = endDate;
  }, [endDate]);

  const isOpenAndMinimized = useMemo(
    () => !!endDate && minimized,
    [endDate, minimized]
  );

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

  const commonShow = useCallback(
    (onFinished?: () => void) => {
      setEndDate(addSeconds(new Date(), BREAK_TIME));
      setMinimized(false);
      if (!!onFinished) {
        setOnFinishedCallbacks([...onFinishedCallbacks, onFinished]);
      }
      setupNotifications();
    },
    [onFinishedCallbacks]
  );

  const show = useCallback<AfterExerciseTimerContextType['show']>(
    (onFinished) => {
      commonShow(onFinished);
      setType('AFTER_SET');
    },
    [commonShow]
  );

  const showAfterLastSet = useCallback<
    AfterExerciseTimerContextType['showAfterLastSet']
  >(
    (nextName, nextMuscleGroup, onFinished) => {
      commonShow(onFinished);
      setNextExerciseName(nextName);
      setNextExerciseMuscleGroup(nextMuscleGroup);
      setType('AFTER_EXERCISE');
    },
    [commonShow]
  );

  const showAfterLastExercise = useCallback<
    AfterExerciseTimerContextType['showAfterLastExercise']
  >(
    (onFinished) => {
      commonShow(onFinished);
      setType('END_OF_WORKOUT');
    },
    [commonShow]
  );

  const cancel = useCallback(() => {
    setEndDate(undefined);
    setOnFinishedCallbacks([]);
  }, []);

  const backdropRef = useRef<HTMLDivElement>(null);
  const expandedModalRef = useRef<HTMLDivElement>(null);
  const minimizedModalRef = useRef<HTMLDivElement>(null);

  const { endWorkout } = useContext(WorkoutContext);

  let body = (
    <>
      <div className={styles.time}>{formattedTime}</div>
      <div className={styles.buttonBar}>
        <button
          type='button'
          className={'standard-button outlined slim'}
          onClick={() => setMinimized(true)}
        >
          <i className='fa-solid fa-down-left-and-up-right-to-center'></i>
        </button>
        <button
          type='button'
          className={classNames('standard-button primary slim', styles.flex)}
          onClick={() => setEndDate(undefined)}
        >
          <i className='fa-solid fa-xmark'></i>
          Dismiss
        </button>
      </div>
    </>
  );

  if (type === 'AFTER_EXERCISE') {
    body = (
      <>
        <div className={styles.time}>{formattedTime}</div>
        <label>Next Exercise</label>
        <div className={styles.nextExercise}>
          <div>{nextExerciseName}</div>
          <MuscleGroupTag muscleGroup={nextExerciseMuscleGroup} />
        </div>
        <div className={styles.buttonBar}>
          <button
            type='button'
            className={'standard-button outlined slim'}
            onClick={() => setMinimized(true)}
          >
            <i className='fa-solid fa-down-left-and-up-right-to-center'></i>
          </button>
          <button
            type='button'
            className={classNames('standard-button primary slim', styles.flex)}
            onClick={() => setEndDate(undefined)}
          >
            <i className='fa-solid fa-xmark'></i>
            Dismiss
          </button>
        </div>
      </>
    );
  } else if (type === 'END_OF_WORKOUT') {
    body = (
      <>
        <div className={styles.time}>{formattedTime}</div>
        <LoadingButton
          type='button'
          className={'standard-button primary slim'}
          onClick={() => endWorkout()}
        >
          <i className='fa-solid fa-save'></i>
          Save Workout and End
        </LoadingButton>
        <button
          type='button'
          className={'standard-button outlined slim'}
          onClick={() => setEndDate(undefined)}
        >
          <i className='fa-solid fa-xmark'></i>
          Dismiss
        </button>
      </>
    );
  }

  return (
    <AfterExerciseTimerContext.Provider
      value={{
        show,
        showAfterLastExercise,
        showAfterLastSet,
        cancel,
        isOpenAndMinimized,
      }}
    >
      {children}
      <Portal>
        <CSSTransition
          in={!!endDate && !minimized}
          nodeRef={backdropRef}
          timeout={TIMEOUT}
          mountOnEnter
          unmountOnExit
          classNames={styles}
        >
          <div ref={backdropRef} className={styles.backdrop}></div>
        </CSSTransition>
        <CSSTransition
          in={!!endDate && !minimized}
          nodeRef={expandedModalRef}
          timeout={TIMEOUT}
          mountOnEnter
          unmountOnExit
          classNames={styles}
        >
          <div ref={expandedModalRef} className={styles.expandedModal}>
            <FocusTrap>
              <div className={styles.body}>{body}</div>
            </FocusTrap>
          </div>
        </CSSTransition>
        <CSSTransition
          in={!!endDate && !!minimized}
          nodeRef={minimizedModalRef}
          timeout={TIMEOUT}
          mountOnEnter
          unmountOnExit
          classNames={styles}
        >
          <div ref={minimizedModalRef} className={styles.minimizedModal}>
            <div className={styles.time}>{formattedTime}</div>
            <div className={styles.buttonBar}>
              <button
                type='button'
                className={'standard-button outlined slim'}
                onClick={() => setMinimized(false)}
              >
                <i className='fa-solid fa-up-right-and-down-left-from-center'></i>
              </button>
              <button
                type='button'
                className={classNames(
                  'standard-button primary slim',
                  styles.flex
                )}
                onClick={() => setEndDate(undefined)}
              >
                <i className='fa-solid fa-xmark'></i>
                Dismiss
              </button>
            </div>
          </div>
        </CSSTransition>
      </Portal>
    </AfterExerciseTimerContext.Provider>
  );
}
