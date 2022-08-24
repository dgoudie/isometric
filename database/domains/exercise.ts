import {
  ExerciseMuscleGroup,
  IExercise,
  IExerciseExtended,
} from '@dgoudie/isometric-types';

import Exercise from '../models/exercise';
import { buildFindExercisesWithBasicHistoryQuery } from '../aggregations';
import connectMongo from '../mongodb';
import mongoose from 'mongoose';

export async function getExercises(
  userId: string,
  options: {
    search?: string;
    muscleGroup?: ExerciseMuscleGroup;
    ids?: string[];
    name?: string;
    onlyPerformed?: boolean;
    onlyNotPerformed?: boolean;
  } = {},
  page?: number
) {
  await connectMongo();
  let query: object = { userId };
  if (!!options.search) {
    options.search = options.search.replace(/(\w+)/g, '"$1"');
    query = {
      ...query,
      $text: { $search: options.search },
    };
  }
  if (!!options.muscleGroup) {
    query = {
      ...query,
      $or: [
        { primaryMuscleGroup: options.muscleGroup },
        { secondaryMuscleGroups: options.muscleGroup },
      ],
    };
  }
  if (!!options.ids) {
    query = {
      ...query,
      _id: {
        $in: options.ids.map((id) => new mongoose.Types.ObjectId(id)),
      },
    };
  }
  if (!!options.name) {
    query = {
      ...query,
      name: options.name,
    };
  }
  let pipeline = buildFindExercisesWithBasicHistoryQuery(
    query,
    options.onlyPerformed ?? false,
    options.onlyNotPerformed ?? false,
    page
  );
  return Exercise.aggregate<IExerciseExtended>(pipeline);
}
export async function getExerciseById(userId: string, _id: string) {
  await connectMongo();
  const [exercise] = await getExercises(userId, { ids: [_id] });
  return exercise;
}

export async function getExerciseByName(
  userId: string,
  name: string
): Promise<IExerciseExtended> {
  await connectMongo();
  const [exercise] = await getExercises(userId, { name });
  return exercise;
}

export async function saveExercise(userId: string, exercise: IExercise) {
  await connectMongo();
  let exerciseInDatabase = await Exercise.findOne({
    userId,
    _id: exercise._id,
  });
  exerciseInDatabase?.overwrite(exercise);
  return exerciseInDatabase?.save();
}
