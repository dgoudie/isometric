import { IWorkout, WSWorkoutUpdate } from '@dgoudie/isometric-types';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import equal from 'deep-equal';
import { requestNotificationPermission } from '../../utils/notification';
import { usePageVisibility } from 'react-page-visibility';
import { useRouter } from 'next/router';
import { useWebsocketUrl } from '../../utils/use-websocket-url';
import { verifyType } from '../../utils/verify-type';

export const WorkoutContext = createContext<{
  workout: IWorkout | null;
  startWorkout: () => void;
  endWorkout: () => void;
  discardWorkout: () => void;
  persistSetComplete: (
    exericiseIndex: number,
    setIndex: number,
    complete: boolean
  ) => void;
  persistSetRepetitions: (
    exericiseIndex: number,
    setIndex: number,
    repetitions: number | undefined
  ) => void;
  persistSetResistance: (
    exericiseIndex: number,
    setIndex: number,
    resistanceInPounds: number | undefined
  ) => void;
  replaceExercise: (exericiseIndex: number, newExerciseId: string) => void;
  addExercise: (exerciseId: string, index: number) => void;
  deleteExercise: (index: number) => void;
}>({
  workout: null,
  startWorkout: () => undefined,
  endWorkout: () => undefined,
  discardWorkout: () => undefined,
  persistSetComplete: () => undefined,
  persistSetRepetitions: () => undefined,
  persistSetResistance: () => undefined,
  replaceExercise: () => undefined,
  addExercise: () => undefined,
  deleteExercise: () => undefined,
});

export default function WorkoutProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const websocketUrl = useWebsocketUrl();

  const pageVisible: boolean = usePageVisibility();
  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(
    websocketUrl,
    { shouldReconnect: () => true },
    pageVisible
  );

  const [workout, setWorkout] = useState<IWorkout>(lastJsonMessage);

  useEffect(() => {
    if (readyState === ReadyState.OPEN && !equal(lastJsonMessage, workout)) {
      setWorkout(lastJsonMessage);
    }
  }, [lastJsonMessage, readyState, workout]);

  const startWorkout = useCallback(() => {
    requestNotificationPermission();
    sendJsonMessage(verifyType<WSWorkoutUpdate>({ type: 'START' }));
  }, [sendJsonMessage]);
  const endWorkout = useCallback(() => {
    sendJsonMessage(verifyType<WSWorkoutUpdate>({ type: 'END' }));
  }, [sendJsonMessage]);
  const discardWorkout = useCallback(() => {
    sendJsonMessage(verifyType<WSWorkoutUpdate>({ type: 'DISCARD' }));
  }, [sendJsonMessage]);
  const persistSetComplete = useCallback(
    (exerciseIndex: number, setIndex: number, complete: boolean) => {
      sendJsonMessage(
        verifyType<WSWorkoutUpdate>({
          type: 'PERSIST_SET_COMPLETE',
          exerciseIndex,
          setIndex,
          complete,
        })
      );
    },
    [sendJsonMessage]
  );
  const replaceExercise = useCallback(
    (exerciseIndex: number, newExerciseId: string) => {
      sendJsonMessage(
        verifyType<WSWorkoutUpdate>({
          type: 'REPLACE_EXERCISE',
          exerciseIndex,
          newExerciseId,
        })
      );
    },
    [sendJsonMessage]
  );
  const addExercise = useCallback(
    (exerciseId: string, index: number) => {
      sendJsonMessage(
        verifyType<WSWorkoutUpdate>({
          type: 'ADD_EXERCISE',
          exerciseId,
          index,
        })
      );
    },
    [sendJsonMessage]
  );
  const deleteExercise = useCallback(
    (index: number) => {
      sendJsonMessage(
        verifyType<WSWorkoutUpdate>({
          type: 'DELETE_EXERCISE',
          index,
        })
      );
    },
    [sendJsonMessage]
  );
  const persistSetRepetitions = useCallback(
    (
      exerciseIndex: number,
      setIndex: number,
      repetitions: number | undefined
    ) => {
      sendJsonMessage(
        verifyType<WSWorkoutUpdate>({
          type: 'PERSIST_SET_REPETITIONS',
          exerciseIndex,
          setIndex,
          repetitions,
        })
      );
    },
    [sendJsonMessage]
  );
  const persistSetResistance = useCallback(
    (
      exerciseIndex: number,
      setIndex: number,
      resistanceInPounds: number | undefined
    ) => {
      sendJsonMessage(
        verifyType<WSWorkoutUpdate>({
          type: 'PERSIST_SET_RESISTANCE',
          exerciseIndex,
          setIndex,
          resistanceInPounds,
        })
      );
    },
    [sendJsonMessage]
  );
  const router = useRouter();

  useEffect(() => {
    if (typeof workout != 'undefined') {
      if (workout === null && router.pathname === '/workout') {
        router.replace('/home');
      } else if (workout !== null && router.pathname !== '/workout') {
        router.replace('/workout');
      }
    }
  }, [router, workout]);

  return (
    <WorkoutContext.Provider
      value={{
        workout,
        startWorkout,
        endWorkout,
        discardWorkout,
        persistSetComplete,
        persistSetRepetitions,
        persistSetResistance,
        replaceExercise,
        addExercise,
        deleteExercise,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
