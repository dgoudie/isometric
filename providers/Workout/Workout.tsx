import React, { createContext, useCallback, useEffect, useState } from 'react';

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
    activeWorkoutExerciseId: string,
    newExerciseId: string
  ) => void;
  addExercise: (exerciseId: string, index: number) => void;
  deleteExercise: (index: number) => void;
}>({
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
    (activeWorkoutExerciseId: string, newExerciseId: string) => {
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
