import React, { createContext, useCallback, useEffect, useState } from 'react';

import { IWorkout } from '@dgoudie/isometric-types';
import { usePageVisibility } from 'react-page-visibility';
import { usePusher } from '@harelpls/use-pusher';
import { useRouter } from 'next/router';

export const WorkoutContext = createContext<{
  workout: IWorkout | null | undefined;
  startWorkout: () => void;
  endWorkout: () => void;
  discardWorkout: () => void;
  persistSetComplete: (
    exerciseIndex: number,
    setIndex: number,
    complete: boolean
  ) => void;
  persistSetRepetitions: (
    exerciseIndex: number,
    setIndex: number,
    repetitions: number | undefined
  ) => void;
  persistSetResistance: (
    exerciseIndex: number,
    setIndex: number,
    resistanceInPounds: number | undefined
  ) => void;
  replaceExercise: (exerciseIndex: number, newExerciseId: string) => void;
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
  const [workout, setWorkout] = useState<IWorkout | null | undefined>(
    undefined
  );
  const { client } = usePusher();

  const pageVisible = usePageVisibility();

  useEffect(() => {
    let bind: any;
    if (!!client && pageVisible) {
      bind = client?.user.bind('workout_state', (data: IWorkout | undefined) =>
        setWorkout(data ?? null)
      );
    }
    return () => {
      bind?.unbind();
    };
  }, [client, pageVisible]);

  const startWorkout = useCallback(() => {
    fetch(`/api/workout/start`);
  }, []);
  const endWorkout = useCallback(() => {
    fetch(`/api/workout/end`);
  }, []);
  const discardWorkout = useCallback(() => {
    fetch(`/api/workout/discard`);
  }, []);
  const persistSetComplete = useCallback(
    (exerciseIndex: number, setIndex: number, complete: boolean) => {
      const query = new URLSearchParams({
        exercise_index: exerciseIndex.toString(),
        set_index: setIndex.toString(),
        complete: complete.toString(),
      });
      fetch(`/api/workout/persist_set_complete?${query}`);
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
