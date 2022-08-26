import { ExerciseMuscleGroup, Prisma } from '@prisma/client';

import { XOR } from '../../utils/xor';
import prisma from '../prisma';

type GetExerciseOptions = {
  muscleGroup?: ExerciseMuscleGroup;
  ids?: string[];
  onlyPerformed?: boolean;
  onlyNotPerformed?: boolean;
  name?: XOR<{ search?: string }, { equals?: string }>;
};

export async function getExercises(
  userId: string,
  options: GetExerciseOptions = {},
  page?: number
) {
  let take: number | undefined = undefined;
  let skip: number | undefined = undefined;
  if (typeof page !== 'undefined') {
    take = 10;
    skip = (page - 1) * 10;
  }
  let filters: Prisma.ExerciseWhereInput[] = [{ userId }];
  if (options.name) {
    if (options.name.search) {
      filters.push({
        AND: options.name.search
          .split(/\s/)
          .map((token) => ({ name: { contains: token, mode: 'insensitive' } })),
      });
    } else if (options.name.equals) {
      filters.push({ name: options.name.equals });
    }
  }
  if (options.muscleGroup) {
    filters.push({
      OR: [
        { primaryMuscleGroup: options.muscleGroup },
        {
          secondaryMuscleGroups: {
            has: options.muscleGroup,
          },
        },
      ],
    });
  }
  return prisma.exercise.findMany({
    where: {
      AND: filters,
    },
    orderBy: {
      name: 'asc',
    },
    take,
    skip,
  });
  // await connectMongo();
  // let query: object = { userId };
  // if (!!options.search) {
  //   options.search = options.search.replace(/(\w+)/g, '"$1"');
  //   query = {
  //     ...query,
  //     $text: { $search: options.search },
  //   };
  // }
  // if (!!options.muscleGroup) {
  //   query = {
  //     ...query,
  //     $or: [
  //       { primaryMuscleGroup: options.muscleGroup },
  //       { secondaryMuscleGroups: options.muscleGroup },
  //     ],
  //   };
  // }
  // if (!!options.ids) {
  //   query = {
  //     ...query,
  //     _id: {
  //       $in: options.ids.map((id) => new mongoose.Types.ObjectId(id)),
  //     },
  //   };
  // }
  // if (!!options.name) {
  //   query = {
  //     ...query,
  //     name: options.name,
  //   };
  // }
  // let pipeline = buildFindExercisesWithBasicHistoryQuery(
  //   query,
  //   options.onlyPerformed ?? false,
  //   options.onlyNotPerformed ?? false,
  //   page
  // );
  // return Exercise.aggregate<IExerciseExtended>(pipeline);
}
export async function getExerciseById(userId: string, id: number) {
  return prisma.exercise.findFirst({ where: { userId, id } });
}

export async function getExerciseByName(userId: string, name: string) {
  return prisma.exercise.findFirst({ where: { userId, name } });
}

export async function saveExercise(
  userId: string,
  exerciseId: number,
  exercise: Prisma.ExerciseUpdateInput
) {
  await prisma.exercise.updateMany({
    data: exercise,
    where: {
      id: exerciseId,
      userId,
    },
  });
}
