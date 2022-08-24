import {
  getFullActiveWorkout,
  getMinifiedActiveWorkout,
} from '../../../database/domains/workout';
import { isNaB, parseBoolean } from '../../../utils/boolean';

import { NextApiHandler } from 'next';
import Workout from '../../../database/models/workout';
import { broadcastWorkoutUpdate } from '../../../utils/broadcast-workout-update';
import { getUserId } from '../../../utils/get-user-id';

const handler: NextApiHandler = async (req, res) => {
  const userId = await getUserId(req, res);
  if (!userId) {
    res.status(403).end();
    return;
  }
  const { exercise_index, set_index, complete } = req.query;
  if (typeof exercise_index !== 'string' || isNaN(parseInt(exercise_index))) {
    res.status(400).send(`Parameter exercise_index is invalid.`);
    return;
  }
  if (typeof set_index !== 'string' || isNaN(parseInt(set_index))) {
    res.status(400).send(`Parameter set_index is invalid.`);
    return;
  }
  if (typeof complete !== 'string' || isNaB(parseBoolean(complete))) {
    res.status(400).send(`Parameter complete is invalid.`);
    return;
  }
  await Workout.updateOne(
    { userId, endedAt: undefined },
    {
      $set: {
        [`exercises.${exercise_index}.sets.${set_index}.complete`]:
          parseBoolean(complete),
      },
    }
  );
  await ensureNoIncompleteSetsBeforeCompleteSets(
    userId,
    parseInt(exercise_index)
  );
  broadcastWorkoutUpdate(userId, await getMinifiedActiveWorkout(userId));
  res.end();
};

export default handler;

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
