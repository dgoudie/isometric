import { ISchedule, IScheduleDayWithExercises } from '@dgoudie/isometric-types';
import mongoose, { PipelineStage } from 'mongoose';

import Schedule from '../models/schedule';
import connectMongo from '../repository';
import { getMostRecentCompletedWorkout } from './workout';

export function getSchedule(userId: string) {
  return Schedule.findOne({ userId });
}

export function saveSchedule(userId: string, schedule: ISchedule) {
  return Schedule.updateOne(
    { userId },
    { ...schedule, userId },
    { upsert: true }
  );
}

export async function getNextDaySchedule(userId: string) {
  await connectMongo();
  let dayNumber = 0;
  const lastWorkout = await getMostRecentCompletedWorkout(userId);
  if (!!lastWorkout) {
    dayNumber = lastWorkout.dayNumber + 1;
  }
  const [day] = await Schedule.aggregate<IScheduleDayWithExercises>(
    buildNextDayScheduleAggregation(userId, dayNumber)
  );
  return day;
}

const buildNextDayScheduleAggregation = (userId: string, dayNumber: number) => {
  let pipeline: PipelineStage[] = [];
  pipeline = [
    {
      $match: {
        userId,
      },
    },
    {
      $addFields: {
        dayCount: {
          $size: '$days',
        },
      },
    },
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
        exerciseIds: '$days.exerciseIds',
        dayCount: '$dayCount',
        dayNumber: '$dayNumber',
      },
    },
    {
      $match: {
        $or: [
          {
            dayNumber,
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
    {
      $unwind: {
        path: '$exerciseIds',
        includeArrayIndex: 'index',
      },
    },
    {
      $lookup: {
        from: 'exercises',
        localField: 'exerciseIds',
        foreignField: '_id',
        as: 'exercises',
      },
    },
    {
      $set: {
        exercisesIds: {
          $arrayElemAt: ['$exercisesIds', 0],
        },
        exercises: {
          $arrayElemAt: ['$exercises', 0],
        },
      },
    },
    {
      $group: {
        _id: '$_id',
        nickname: {
          $first: '$nickname',
        },
        dayNumber: {
          $first: '$dayNumber',
        },
        dayCount: {
          $first: '$dayCount',
        },
        exercises: {
          $push: '$exercises',
        },
        exerciseIds: {
          $push: '$exerciseIds',
        },
      },
    },
  ];
  return pipeline;
};
