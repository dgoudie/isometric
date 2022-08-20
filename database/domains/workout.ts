import {
  IExercise,
  IWorkout,
  IWorkoutExercise,
  IWorkoutExerciseSet,
} from '@dgoudie/isometric-types';
import {
  differenceInMilliseconds,
  millisecondsToSeconds,
  minutesToMilliseconds,
} from 'date-fns';

import Exercise from '../models/exercise';
import { PipelineStage } from 'mongoose';
import Workout from '../models/workout';
import { buildGetExerciseHistoryById as buildGetWorkoutInstancesByExerciseNameQuery } from '../aggregations';
import { getExerciseById } from './exercise';
import { getNextDaySchedule } from './schedule';

export async function getCompletedWorkouts(userId: string, page?: number) {
  let query = Workout.find({ userId, endedAt: { $exists: true } }).sort({
    createdAt: -1,
  });
  if (typeof page !== 'undefined') {
    query = query.limit(10).skip((page - 1) * 10);
  }
  return query.exec();
}

export async function getMinifiedActiveWorkout(
  userId: string
): Promise<Partial<IWorkout> | null> {
  return Workout.findOne({ userId, endedAt: undefined }, 'exercises');
}

export async function getFullActiveWorkout(
  userId: string
): Promise<IWorkout | null> {
  let pipeline: PipelineStage[] = [
    {
      $match: {
        userId,
        endedAt: undefined,
      },
    },
    {
      $unwind: {
        path: '$checkIns',
      },
    },
    {
      $sort: {
        checkIns: 1,
      },
    },
    {
      $group: {
        _id: '$_id',
        root: {
          $first: '$$ROOT',
        },
        checkIns: {
          $push: '$checkIns',
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            '$root',
            {
              checkIns: '$checkIns',
            },
          ],
        },
      },
    },
    { $limit: 1 },
  ];
  const [result] = await Workout.aggregate(pipeline);
  return result ?? null;
}

export async function addCheckInToActiveExercise(userId: string) {
  Workout.updateOne(
    { userId, endedAt: undefined },
    {
      $push: { checkIns: new Date() },
    }
  ).exec();
}

export async function startWorkout(userId: string) {
  const { nickname, dayNumber, exercises } = await getNextDaySchedule(userId);

  const alreadyInProgressWorkout = await Workout.findOne({
    userId,
    endedAt: undefined,
  });

  let exercisesMapped: IWorkoutExercise[] = exercises.map(
    mapExerciseToInstance
  );

  if (!!alreadyInProgressWorkout) {
    return alreadyInProgressWorkout;
  }

  await Workout.create({
    userId,
    startedAt: new Date(),
    dayNumber,
    nickname,
    exercises: exercisesMapped,
    checkIns: [new Date()],
  });
  return getMinifiedActiveWorkout(userId);
}

export async function persistSetComplete(
  userId: string,
  exerciseIndex: number,
  setIndex: number,
  complete: boolean
) {
  await Workout.updateOne(
    { userId, endedAt: undefined },
    {
      $set: {
        [`exercises.${exerciseIndex}.sets.${setIndex}.complete`]: complete,
      },
    }
  );
  await ensureNoIncompleteSetsBeforeCompleteSets(userId, exerciseIndex);
  return getMinifiedActiveWorkout(userId);
}

export async function persistSetRepetitions(
  userId: string,
  exerciseIndex: number,
  setIndex: number,
  repetitions: number | undefined
) {
  await Workout.updateOne(
    { userId, endedAt: undefined },
    {
      [typeof repetitions !== 'undefined' ? '$set' : '$unset']: {
        [`exercises.${exerciseIndex}.sets.${setIndex}.repetitions`]:
          repetitions ?? '',
      },
    }
  );
  return getMinifiedActiveWorkout(userId);
}

export async function persistSetResistance(
  userId: string,
  exerciseIndex: number,
  setIndex: number,
  resistanceInPounds: number | undefined
) {
  await Workout.updateOne(
    { userId, endedAt: undefined },
    {
      [typeof resistanceInPounds !== 'undefined' ? '$set' : '$unset']: {
        [`exercises.${exerciseIndex}.sets.${setIndex}.resistanceInPounds`]:
          resistanceInPounds ?? '',
      },
    }
  );
  await populateResistanceForNextSets(userId, exerciseIndex, setIndex);
  return getMinifiedActiveWorkout(userId);
}

export async function replaceExercise(
  userId: string,
  exerciseIndex: number,
  newExerciseId: string
) {
  const newExercise = await getExerciseById(userId, newExerciseId);
  if (!newExercise) {
    return;
  }
  const workoutExerciseMapped = mapExerciseToInstance(newExercise);
  await Workout.updateOne(
    { userId, endedAt: undefined },
    { [`exercises.${exerciseIndex}`]: workoutExerciseMapped }
  );
  return getMinifiedActiveWorkout(userId);
}

export async function addExercise(
  userId: string,
  exerciseId: string,
  index: number
) {
  const newExercise = await getExerciseById(userId, exerciseId);
  if (!newExercise) {
    return;
  }
  const workoutExerciseMapped = mapExerciseToInstance(newExercise);
  await Workout.updateOne(
    { userId, endedAt: undefined },
    {
      $push: {
        exercises: {
          $each: [workoutExerciseMapped],
          $position: index,
        },
      },
    }
  );
  return getMinifiedActiveWorkout(userId);
}

export async function deleteExercise(userId: string, index: number) {
  const activeWorkout = await getFullActiveWorkout(userId);
  if (!activeWorkout) {
    return;
  }
  if (activeWorkout.exercises.length < 2) {
    return null;
  }
  activeWorkout.exercises.splice(index, 1);
  await Workout.updateOne(
    { userId, endedAt: undefined },
    {
      $set: {
        exercises: activeWorkout.exercises,
      },
    }
  );
  return getMinifiedActiveWorkout(userId);
}

export async function endWorkout(userId: string) {
  const activeWorkout = await getFullActiveWorkout(userId);
  if (!activeWorkout) {
    return;
  }
  const checkIns = [...activeWorkout.checkIns!, new Date()];
  let durationInMilliseconds = 0;
  for (let index = 0; index < checkIns.length - 1; index++) {
    const checkIn = checkIns[index];
    const nextCheckIn = checkIns[index + 1];
    let durationBetweenCheckIns = differenceInMilliseconds(
      new Date(nextCheckIn),
      new Date(checkIn)
    );
    durationInMilliseconds += Math.min(
      durationBetweenCheckIns,
      minutesToMilliseconds(30)
    );
  }
  const durationInSeconds = millisecondsToSeconds(durationInMilliseconds);
  return Workout.updateOne(
    {
      userId,
      endedAt: undefined,
    },
    [
      {
        $addFields: {
          endedAt: new Date(),
          durationInSeconds,
          exercises: {
            $filter: {
              input: '$exercises',
              as: 'exercise',
              cond: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: '$$exercise.sets',
                        as: 'set',
                        cond: {
                          $eq: ['$$set.complete', true],
                        },
                      },
                    },
                  },
                  0,
                ],
              },
            },
          },
        },
      },
      { $unset: 'checkIns' },
    ]
  );
}

export async function discardWorkout(userId: string) {
  return Workout.deleteOne({
    userId,
    endedAt: undefined,
  });
}

export function getMostRecentCompletedWorkout(userId: string) {
  return Workout.findOne({
    userId,
    endedAt: { $exists: true },
  }).sort({ createdAt: -1 });
}

function mapExerciseToInstance(exercise: IExercise): IWorkoutExercise {
  return {
    ...exercise,
    sets: new Array<IWorkoutExerciseSet>(exercise.setCount).fill({
      complete: false,
      timeInSeconds:
        exercise.exerciseType === 'timed'
          ? exercise.timePerSetInSeconds
          : undefined,
    }),
    performedAt: new Date(),
  };
}

async function ensureNoIncompleteSetsBeforeCompleteSets(
  userId: string,
  exerciseIndex: number
) {
  let activeWorkout = await getFullActiveWorkout(userId);
  if (!activeWorkout) {
    return;
  }
  let exerciseAtIndex = activeWorkout.exercises[exerciseIndex];
  let firstUnfinishedExercise = exerciseAtIndex.sets.findIndex(
    (set) => !set.complete
  );
  if (firstUnfinishedExercise < 0) {
    return;
  }
  let updatePromises = [];
  for (let i = firstUnfinishedExercise; i < exerciseAtIndex.sets.length; i++) {
    updatePromises.push(
      Workout.updateOne(
        {
          userId,
          endedAt: undefined,
        },
        { $set: { [`exercises.${exerciseIndex}.sets.${i}.complete`]: false } }
      )
    );
  }
  await Promise.all(updatePromises);
}
async function populateResistanceForNextSets(
  userId: string,
  exerciseIndex: number,
  setIndex: number
) {
  let activeWorkout = await getFullActiveWorkout(userId);
  if (!activeWorkout) {
    return;
  }
  let exerciseAtIndex = activeWorkout.exercises[exerciseIndex];
  if (setIndex >= exerciseAtIndex.sets.length - 1) {
    return;
  }
  const set = exerciseAtIndex.sets[setIndex];
  if (set.complete) {
    return;
  }
  const setResistancePersisted = set.resistanceInPounds;
  let promises: ReturnType<typeof Workout.updateOne>[] = [];
  exerciseAtIndex.sets.slice(setIndex).forEach((set, index) => {
    if (typeof set.repetitions === 'undefined' && !set.complete) {
      promises.push(
        Workout.updateOne(
          {
            userId,
            endedAt: undefined,
          },
          {
            $set: {
              [`exercises.${exerciseIndex}.sets.${
                setIndex + index
              }.resistanceInPounds`]: setResistancePersisted,
            },
          }
        )
      );
    }
  });
  await Promise.all(promises);
}

export async function getWorkoutInstancesByExerciseName(
  userId: string,
  name: string,
  page?: number
) {
  const exercise = await Exercise.findOne({ name });
  if (!exercise) {
    throw new Error(`Exercise with name '${name}' not found.`);
  }
  return Workout.aggregate<IWorkoutExercise>(
    buildGetWorkoutInstancesByExerciseNameQuery(
      userId,
      exercise._id,
      name,
      page
    )
  );
}
