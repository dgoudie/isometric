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
  deleteExercise: (activeWorkoutExerciseId: string) => void;
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
    fetch(`/api/workout/start`);
  }, []);
  const endWorkout = useCallback(() => {
    fetch(`/api/workout/end`);
  }, []);
  const discardWorkout = useCallback(() => {
    fetch(`/api/workout/discard`);
  }, []);
  const persistSetComplete = useCallback(
    (activeWorkoutExerciseId: string, setIndex: number, complete: boolean) => {
      fetch(`/api/workout/persist_set_complete`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          activeWorkoutExerciseId,
          setIndex,
          complete,
        }),
      });
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
  const deleteExercise = useCallback((activeWorkoutExerciseId: string) => {
    // sendJsonMessage(
    //   verifyType<WSWorkoutUpdate>({
    //     type: 'DELETE_EXERCISE',
    //     index,
    //   })
    // );
  }, []);
  const persistSetRepetitions = useCallback(
    (
      activeWorkoutExerciseId: string,
      setIndex: number,
      repetitions: number | null
    ) => {
      fetch(`/api/workout/persist_set_repetitions`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          activeWorkoutExerciseId,
          setIndex,
          repetitions,
        }),
      });
    },
    []
  );
  const persistSetResistance = useCallback(
    (
      activeWorkoutExerciseId: string,
      setIndex: number,
      resistanceInPounds: number | null
    ) => {
      fetch(`/api/workout/persist_set_resistance`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          activeWorkoutExerciseId,
          setIndex,
          resistanceInPounds,
        }),
      });
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
