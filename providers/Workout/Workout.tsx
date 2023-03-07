import React, { createContext, useCallback, useContext } from 'react';
import pRetry, { AbortError } from 'p-retry';

import { SnackbarContext } from '../Snackbar/Snackbar';
import { setupNotifications } from '../../utils/notification';
import { useSWRConfig } from 'swr';

export const WorkoutContext = createContext<{
  startWorkout: (dayNumber?: number) => void;
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
    activeWorkoutExerciseId: string,
    newExerciseId: string
  ) => Promise<void>;
  addExercise: (exerciseId: string, index: number) => Promise<void>;
  deleteExercise: (activeWorkoutExerciseId: string) => Promise<void>;
}>({
  startWorkout: () => undefined,
  endWorkout: () => undefined,
  discardWorkout: () => undefined,
  persistSetComplete: () => undefined,
  persistSetRepetitions: () => undefined,
  persistSetResistance: () => undefined,
  replaceExercise: () => Promise.reject(),
  addExercise: () => Promise.reject(),
  deleteExercise: () => Promise.reject(),
});

export default function WorkoutProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const { openSnackbar } = useContext(SnackbarContext);
  const { mutate } = useSWRConfig();

  const fetcher = useCallback(
    async (...args: Parameters<typeof fetch>) => {
      const run = () =>
        fetch(...args).then((res) => {
          if (res.ok) {
            return;
          } else if (res.status === 409) {
            throw new Error(res.statusText);
          } else {
            throw new AbortError(res.statusText);
          }
        });
      try {
        return await pRetry(run, { retries: 5 });
      } catch {
        openSnackbar('An unexpected error occurred...');
        mutate('/api/workout/active');
      }
    },
    [mutate, openSnackbar]
  );

  const startWorkout = useCallback(
    (dayNumber?: number) => {
      setupNotifications();
      if (typeof dayNumber === 'number') {
        return fetcher(`/api/workout/start/${dayNumber}`);
      }
      return fetcher(`/api/workout/start`);
    },
    [fetcher]
  );
  const endWorkout = useCallback(() => {
    return fetcher(`/api/workout/end`);
  }, [fetcher]);
  const discardWorkout = useCallback(() => {
    return fetcher(`/api/workout/discard`);
  }, [fetcher]);
  const persistSetComplete = useCallback(
    (activeWorkoutExerciseId: string, setIndex: number, complete: boolean) => {
      return fetcher(`/api/workout/persist_set_complete`, {
        method: 'POST',
        body: JSON.stringify({
          activeWorkoutExerciseId,
          setIndex,
          complete,
        }),
        headers: {
          'content-type': 'application/json',
        },
      });
    },
    [fetcher]
  );
  const replaceExercise = useCallback(
    async (activeWorkoutExerciseId: string, newExerciseId: string) => {
      await fetcher(`/api/workout/replace_exercise`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          activeWorkoutExerciseId,
          newExerciseId,
        }),
      });
    },
    [fetcher]
  );
  const addExercise = useCallback(
    async (exerciseId: string, index: number) => {
      await fetcher(`/api/workout/add_exercise`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          index,
          exerciseId,
        }),
      });
    },
    [fetcher]
  );
  const deleteExercise = useCallback(
    async (activeWorkoutExerciseId: string) => {
      await fetcher(`/api/workout/delete_exercise`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          activeWorkoutExerciseId,
        }),
      });
    },
    [fetcher]
  );
  const persistSetRepetitions = useCallback(
    (
      activeWorkoutExerciseId: string,
      setIndex: number,
      repetitions: number | null
    ) => {
      return fetcher(`/api/workout/persist_set_repetitions`, {
        method: 'POST',
        body: JSON.stringify({
          activeWorkoutExerciseId,
          setIndex,
          repetitions,
        }),
        headers: {
          'content-type': 'application/json',
        },
      });
    },
    [fetcher]
  );
  const persistSetResistance = useCallback(
    (
      activeWorkoutExerciseId: string,
      setIndex: number,
      resistanceInPounds: number | null
    ) => {
      return fetcher(`/api/workout/persist_set_resistance`, {
        method: 'POST',
        body: JSON.stringify({
          activeWorkoutExerciseId,
          setIndex,
          resistanceInPounds,
        }),
        headers: {
          'content-type': 'application/json',
        },
      });
    },
    [fetcher]
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
