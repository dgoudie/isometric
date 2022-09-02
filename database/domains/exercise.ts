import { Exercise, ExerciseMuscleGroup, Prisma } from '@prisma/client';
import {
  PersonalBestSet,
  getPersonalBestsForExerciseIds,
} from '../utils/personal-best';

import { XOR } from '../../utils/xor';
import prisma from '../prisma';

type GetExerciseOptions = {
  muscleGroup?: ExerciseMuscleGroup;
  ids?: string[];
  onlyPerformed?: boolean;
  onlyNotPerformed?: boolean;
  name?: XOR<{ search?: string }, { equals?: string }>;
};

type ExerciseWithPersonalBestAndLastPerformed = Exercise & {
  personalBest: PersonalBestSet | null;
  lastPerformed: Date;
};

export async function getExercises(
  userId: string,
  options: GetExerciseOptions = {},
  page?: number
): Promise<ExerciseWithPersonalBestAndLastPerformed[]> {
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
  if (options.ids) {
    filters.push({
      id: {
        in: options.ids,
      },
    });
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
  if (options.onlyPerformed || options.onlyNotPerformed) {
    const completedExercises = await prisma.finishedWorkoutExercise.findMany({
      where: {
        AND: [
          {
            finishedWorkout: {
              userId,
            },
          },
        ],
      },
      select: {
        exerciseId: true,
        name: true,
      },
      distinct: ['exerciseId', 'name'],
    });
    const completedIds = new Set<string>(
      completedExercises
        .filter(({ exerciseId }) => exerciseId !== null)
        .map((exercise) => exercise.exerciseId as string)
    );
    const completedNames = new Set(
      completedExercises.map((exercise) => exercise.name)
    );
    if (options.onlyPerformed) {
      filters.push({
        OR: [
          {
            name: {
              in: Array.from(completedNames),
            },
          },
          {
            id: {
              in: Array.from(completedIds),
            },
          },
        ],
      });
    } else if (options.onlyNotPerformed) {
      filters.push({
        AND: [
          {
            name: {
              notIn: Array.from(completedNames),
            },
          },
          {
            id: {
              notIn: Array.from(completedIds),
            },
          },
        ],
      });
    }
  }
  const exercises = await prisma.exercise.findMany({
    where: {
      AND: filters,
    },
    orderBy: {
      name: 'asc',
    },
    take,
    skip,
  });
  const exerciseIds = exercises.map((e) => e.id);
  const personalBestMap = await getPersonalBestsForExerciseIds(
    userId,
    exerciseIds,
    prisma
  );
  const exercisesWithPersonalBest = exercises.map((exercise) => ({
    ...exercise,
    personalBest: personalBestMap.get(exercise.id) ?? null,
  }));
  const exercisesWithPersonalBestWithLastPerformed =
    exercisesWithPersonalBest.map((exercise) => ({
      ...exercise,
      lastPerformed: new Date(),
    }));
  return exercisesWithPersonalBestWithLastPerformed;
}
export async function getExerciseById(userId: string, id: string) {
  return prisma.exercise.findFirst({ where: { userId, id } });
}

export async function getExerciseByName(userId: string, name: string) {
  return prisma.exercise.findFirst({ where: { userId, name } });
}

export async function saveExercise(
  userId: string,
  exerciseId: string,
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
