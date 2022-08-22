import { IWorkout, WSWorkoutUpdate } from '@dgoudie/isometric-types';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useChannel, useEvent, useTrigger } from '@harelpls/use-pusher';

import { requestNotificationPermission } from '../../utils/notification';
import { useRouter } from 'next/router';
import { verifyType } from '../../utils/verify-type';

export const WorkoutContext = createContext<{
  workout: IWorkout | undefined;
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
  workout: undefined,
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
  const [workout, setWorkout] = useState<IWorkout | undefined>();

  const channel = useChannel('workout');
  useEvent<IWorkout>(channel, 'state', (data) => setWorkout(data));

  // useEffect(() => {
  //   channel.
  //   !!channel?.subscribed && fetch(`/api/pusher/request_workout_state`);
  // }, [channel?.subscribed]);

  const startWorkout = useCallback(() => {
    requestNotificationPermission();
    // sendJsonMessage(verifyType<WSWorkoutUpdate>({ type: 'START' }));
  }, []);
  const endWorkout = useCallback(() => {
    // sendJsonMessage(verifyType<WSWorkoutUpdate>({ type: 'END' }));
  }, []);
  const discardWorkout = useCallback(() => {
    // sendJsonMessage(verifyType<WSWorkoutUpdate>({ type: 'DISCARD' }));
  }, []);
  const persistSetComplete = useCallback(
    (exerciseIndex: number, setIndex: number, complete: boolean) => {
      // sendJsonMessage(
      //   verifyType<WSWorkoutUpdate>({
      //     type: 'PERSIST_SET_COMPLETE',
      //     exerciseIndex,
      //     setIndex,
      //     complete,
      //   })
      // );
    },
    []
  );
  const replaceExercise = useCallback(
    (exerciseIndex: number, newExerciseId: string) => {
      // sendJsonMessage(
      //   verifyType<WSWorkoutUpdate>({
      //     type: 'REPLACE_EXERCISE',
      //     exerciseIndex,
      //     newExerciseId,
      //   })
      // );
    },
    []
  );
  const addExercise = useCallback((exerciseId: string, index: number) => {
    // sendJsonMessage(
    //   verifyType<WSWorkoutUpdate>({
    //     type: 'ADD_EXERCISE',
    //     exerciseId,
    //     index,
    //   })
    // );
  }, []);
  const deleteExercise = useCallback((index: number) => {
    // sendJsonMessage(
    //   verifyType<WSWorkoutUpdate>({
    //     type: 'DELETE_EXERCISE',
    //     index,
    //   })
    // );
  }, []);
  const persistSetRepetitions = useCallback(
    (
      exerciseIndex: number,
      setIndex: number,
      repetitions: number | undefined
    ) => {
      // sendJsonMessage(
      //   verifyType<WSWorkoutUpdate>({
      //     type: 'PERSIST_SET_REPETITIONS',
      //     exerciseIndex,
      //     setIndex,
      //     repetitions,
      //   })
      // );
    },
    []
  );
  const persistSetResistance = useCallback(
    (
      exerciseIndex: number,
      setIndex: number,
      resistanceInPounds: number | undefined
    ) => {
      // sendJsonMessage(
      //   verifyType<WSWorkoutUpdate>({
      //     type: 'PERSIST_SET_RESISTANCE',
      //     exerciseIndex,
      //     setIndex,
      //     resistanceInPounds,
      //   })
      // );
    },
    []
  );
  const router = useRouter();

  useEffect(() => {
    if (typeof workout != 'undefined') {
      if (workout === null && router.pathname === '/workout') {
        router.replace('/dashboard');
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
