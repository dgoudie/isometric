import React, { createContext, useCallback, useEffect, useState } from 'react';

import { ActiveWorkoutExerciseWithSetsAndDetails } from '../../types/ActiveWorkoutExercise';
import { useFetchJSONWith403Redirect } from '../../utils/fetch-with-403-redirect';

export const WorkoutContext = createContext<{
  startWorkout: () => void;
  endWorkout: () => void;
  discardWorkout: () => void;
  persistSetComplete: (
    activeWorkoutExerciseId: string,
    setIndex: number,
    complete: boolean
  ) => void;
  persistSetRepetitions: (
    activeWorkoutExerciseId: string,
    setIndex: number,
    repetitions: number | null
  ) => void;
  persistSetResistance: (
    activeWorkoutExerciseId: string,
    setIndex: number,
    resistanceInPounds: number | null
  ) => void;
  replaceExercise: (
    index: number,
    newExerciseId: string
  ) => Promise<ActiveWorkoutExerciseWithSetsAndDetails>;
  addExercise: (exerciseId: string, index: number) => void;
  deleteExercise: (index: number) => void;
}>({
  startWorkout: () => undefined,
  endWorkout: () => undefined,
  discardWorkout: () => undefined,
  persistSetComplete: () => undefined,
  persistSetRepetitions: () => undefined,
  persistSetResistance: () => undefined,
  replaceExercise: () => Promise.reject(),
  addExercise: () => undefined,
  deleteExercise: () => undefined,
});

export default function WorkoutProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const fetcher = useFetchJSONWith403Redirect();
  const startWorkout = useCallback(() => {
    navigator.sendBeacon(`/api/workout/start`);
  }, []);
  const endWorkout = useCallback(() => {
    navigator.sendBeacon(`/api/workout/end`);
  }, []);
  const discardWorkout = useCallback(() => {
    navigator.sendBeacon(`/api/workout/discard`);
  }, []);
  const persistSetComplete = useCallback(
    (activeWorkoutExerciseId: string, setIndex: number, complete: boolean) => {
      navigator.sendBeacon(
        `/api/workout/persist_set_complete`,
        new Blob(
          [
            JSON.stringify({
              activeWorkoutExerciseId,
              setIndex,
              complete,
            }),
          ],
          { type: 'application/json' }
        )
      );
    },
    []
  );
  const replaceExercise = useCallback(
    (index: number, newExerciseId: string) =>
      fetcher(`/api/workout/replace_exercise`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          index,
          newExerciseId,
        }),
      }),
    [fetcher]
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
    navigator.sendBeacon(
      `/api/workout/delete_exercise`,
      new Blob(
        [
          JSON.stringify({
            index,
          }),
        ],
        { type: 'application/json' }
      )
    );
  }, []);
  const persistSetRepetitions = useCallback(
    (
      activeWorkoutExerciseId: string,
      setIndex: number,
      repetitions: number | null
    ) => {
      navigator.sendBeacon(
        `/api/workout/persist_set_repetitions`,
        new Blob(
          [
            JSON.stringify({
              activeWorkoutExerciseId,
              setIndex,
              repetitions,
            }),
          ],
          { type: 'application/json' }
        )
      );
    },
    []
  );
  const persistSetResistance = useCallback(
    (
      activeWorkoutExerciseId: string,
      setIndex: number,
      resistanceInPounds: number | null
    ) => {
      navigator.sendBeacon(
        `/api/workout/persist_set_resistance`,
        new Blob(
          [
            JSON.stringify({
              activeWorkoutExerciseId,
              setIndex,
              resistanceInPounds,
            }),
          ],
          { type: 'application/json' }
        )
      );
    },
    []
  );
  return (
    <WorkoutContext.Provider
      value={{
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
