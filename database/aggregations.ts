import mongoose, { PipelineStage } from 'mongoose';

import { ExerciseMuscleGroup } from '@dgoudie/isometric-types';

export const buildNextDayScheduleAggregation = (nextDayNumber: number) => {
  let pipeline: PipelineStage[] = [];
  pipeline = [
    {
      $unwind: {
        path: '$days',
        includeArrayIndex: 'dayNumber',
      },
    },
    {
      $project: {
        _id: '$days._id',
        nickname: '$days.nickname',
        exercises: '$days.exercises',
        dayNumber: '$dayNumber',
      },
    },
    {
      $match: {
        $or: [
          {
            dayNumber: nextDayNumber,
          },
          {
            dayNumber: 0,
          },
        ],
      },
    },
    {
      $sort: {
        dayNumber: -1,
      },
    },
    {
      $limit: 1,
    },
  ];
  return pipeline;
};

export const joinInstancesToWorkout: PipelineStage = {
  $lookup: {
    from: 'workouts',
    as: 'instances',
    let: {
      exerciseId: '$_id',
    },
    pipeline: [
      {
        $unwind: {
          path: '$exercises',
        },
      },
      {
        $match: {
          $expr: {
            $eq: ['$exercises.exercise._id', '$$exerciseId'],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ],
  },
};

export const buildFindExercisesWithBasicHistoryQuery = (
  query: object,
  onlyPerformed: boolean,
  onlyNotPerformed: boolean,
  page?: number
) => {
  let filterByPerformedStage: PipelineStage[] = [];
  if (onlyPerformed) {
    filterByPerformedStage.push({
      $match: {
        $expr: {
          $ne: ['$lastPerformed', null],
        },
      },
    });
  } else if (onlyNotPerformed) {
    filterByPerformedStage.push({
      $match: {
        $expr: {
          $eq: ['$lastPerformed', null],
        },
      },
    });
  }
  let pipeline: PipelineStage[] = [
    { $match: query },
    {
      $lookup: {
        from: 'workouts',
        as: 'instances',
        let: {
          exercise_id: '$_id',
          exercise_name: '$name',
        },
        pipeline: [
          {
            $unwind: '$exercises',
          },
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $not: {
                      $not: '$endedAt',
                    },
                  },
                  {
                    $or: [
                      { $eq: ['$exercises._id', '$$exercise_id'] },
                      { $eq: ['$exercises.name', '$$exercise_name'] },
                    ],
                  },
                ],
              },
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $addFields: {
              'exercises.totalRepsForInstance': {
                $sum: '$exercises.sets.repetitions',
              },
            },
          },
          {
            $unwind: {
              path: '$exercises.sets',
              preserveNullAndEmptyArrays: true,
              includeArrayIndex: 'exercises.sets.setIndex',
            },
          },
          {
            $match: {
              $expr: {
                $eq: ['$exercises.sets.complete', true],
              },
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: '$instances',
        preserveNullAndEmptyArrays: true,
        includeArrayIndex: 'i',
      },
    },
    {
      $addFields: {
        instances: '$instances.exercises',
      },
    },
    {
      $addFields: {
        'instances.personalBestSortableValue': {
          $cond: [
            {
              $eq: ['$exerciseType', 'rep_based'],
            },
            '$instances.totalRepsForInstance',
            '$instances.sets.resistanceInPounds',
          ],
        },
      },
    },
    {
      $sort: {
        'instances.personalBestSortableValue': -1,
        'instances.performedAt': 1,
      },
    },
    {
      $group: {
        _id: {
          exerciseId: '$_id',
          instanceId: '$i',
        },
        exerciseRoot: {
          $first: '$$ROOT',
        },
        sets: {
          $push: '$instances.sets',
        },
        bestSet: {
          $first: '$instances.sets',
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            '$exerciseRoot',
            {
              bestSet: {
                $cond: [
                  {
                    $not: {
                      $eq: ['$bestSet.setIndex', null],
                    },
                  },
                  '$bestSet',
                  '$$REMOVE',
                ],
              },
              sets: {
                $filter: {
                  input: '$sets',
                  as: 'set',
                  cond: {
                    $not: {
                      $eq: ['$$set.setIndex', null],
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
    {
      $addFields: {
        'instances.sets': {
          $cond: [
            {
              $gt: [
                {
                  $size: '$sets',
                },
                0,
              ],
            },
            '$sets',
            '$$REMOVE',
          ],
        },
        'instances.bestSet': '$bestSet',
      },
    },
    { $unset: ['sets', 'bestSet', 'i'] },
    {
      $sort: {
        'instances.personalBestSortableValue': -1,
        'instances.performedAt': 1,
      },
    },
    {
      $group: {
        _id: '$_id',
        exerciseRoot: {
          $first: '$$ROOT',
        },
        instances: {
          $push: '$instances',
        },
        bestInstance: {
          $first: '$instances',
        },
        bestSet: {
          $first: '$instances.bestSet',
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            '$exerciseRoot',
            {
              instances: {
                $filter: {
                  input: '$instances',
                  as: 'instance',
                  cond: {
                    $not: {
                      $not: '$$instance._id',
                    },
                  },
                },
              },
              bestInstance: {
                $cond: [
                  {
                    $not: '$bestInstance._id',
                  },
                  '$$REMOVE',
                  '$bestInstance',
                ],
              },
              bestSet: {
                $cond: [
                  {
                    $eq: ['$bestSet', null],
                  },
                  '$$REMOVE',
                  '$bestSet',
                ],
              },
              lastPerformed: {
                $max: '$instances.performedAt',
              },
            },
          ],
        },
      },
    },
    ...filterByPerformedStage,
    { $unset: ['sets', 'instances'] },
    {
      $sort: {
        name: 1,
      },
    },
  ];
  if (typeof page !== 'undefined') {
    pipeline = [...pipeline, { $skip: (page - 1) * 10 }, { $limit: 10 }];
  }
  return pipeline;
};

export function buildGetExerciseHistoryById(
  userId: string,
  _id: string,
  name: string,
  page?: number
) {
  let pipeline: PipelineStage[] = [
    {
      $match: {
        endedAt: {
          $exists: true,
        },
      },
    },
    {
      $unwind: {
        path: '$exercises',
      },
    },
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: ['$userId', userId],
            },
            {
              $or: [
                { $eq: ['$exercises.name', name] },
                { $eq: ['$exercises._id', _id] },
              ],
            },
          ],
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            '$exercises',
            {
              sets: {
                $filter: {
                  input: '$exercises.sets',
                  cond: {
                    $eq: ['$$this.complete', true],
                  },
                },
              },
              performedAt: '$createdAt',
            },
          ],
        },
      },
    },
    {
      $match: {
        $expr: {
          $gte: [
            {
              $size: '$sets',
            },
            1,
          ],
        },
      },
    },
    {
      $sort: {
        performedAt: -1,
      },
    },
  ];
  if (typeof page !== 'undefined') {
    pipeline = [...pipeline, { $skip: (page - 1) * 5 }, { $limit: 5 }];
  }
  return pipeline;
}
