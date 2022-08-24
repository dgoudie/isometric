import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DATA = [
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 1,
    nickname: 'Push',
    exercises: [
      {
        sets: [
          {
            complete: true,
            timeInSeconds: 900,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1648850022672',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1648850022672',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 9,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6d3',
        },
        name: 'Medium Cable Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1648850022672',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 6,
          },
          {
            complete: true,
            repetitions: 6,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1648850022672',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b700',
        },
        name: 'Seated Dumbbell Overhead Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1648850022672',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: false,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: false,
            resistanceInPounds: 65,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b726',
        },
        name: 'Dumbbell Overhead Tricep Extensions',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'triceps',
        performedAt: {
          $date: {
            $numberLong: '1648850022672',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            repetitions: 30,
          },
          {
            complete: true,
            repetitions: 20,
          },
          {
            complete: true,
            repetitions: 20,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b740',
        },
        name: 'Hanging Leg Raise, Ab Station',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1648850022672',
          },
        },
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1648850022672',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1648855669793',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1648855669793',
      },
    },
    durationInSeconds: 5640,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 1,
    nickname: 'Push',
    exercises: [
      {
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1649281989485',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 1,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1649281989485',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6d3',
        },
        name: 'Medium Cable Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1649281989485',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 7,
          },
          {
            complete: true,
            repetitions: 5,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1649281989485',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b700',
        },
        name: 'Seated Dumbbell Overhead Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1649281989485',
          },
        },
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1649281989485',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1649288551612',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1649288551612',
      },
    },
    durationInSeconds: 6562,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 0,
    nickname: 'Pull',
    exercises: [
      {
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1649195449632',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 5,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1649195449632',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            repetitions: 10,
            resistanceInPounds: 225,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1649195449632',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 160,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 160,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 160,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6e9',
        },
        name: 'Neutral Grip Lat Pulldown',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1649195449632',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b70c',
        },
        name: 'Dumbbell Lateral Raise',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1649195449632',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1649195449632',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b719',
        },
        name: 'Dumbbell Hammer Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1649195449632',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 15,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 15,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 15,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b736',
        },
        name: 'Decline Situps - Weighted',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1649195449632',
          },
        },
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1649195449632',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1649202234925',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1649202234925',
      },
    },
    durationInSeconds: 6785,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 0,
    nickname: 'Pull',
    exercises: [
      {
        sets: [
          {
            complete: true,
            timeInSeconds: 900,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1648765560839',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            repetitions: 13,
          },
          {
            complete: true,
            repetitions: 11,
          },
          {
            complete: true,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1648765560839',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1648765560839',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 160,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 160,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 160,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6e9',
        },
        name: 'Neutral Grip Lat Pulldown',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1648765560839',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b70c',
        },
        name: 'Dumbbell Lateral Raise',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1648765560839',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1648765560839',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 9,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b719',
        },
        name: 'Dumbbell Hammer Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1648765560839',
          },
        },
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1648765560839',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1648772526408',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1648772526408',
      },
    },
    durationInSeconds: 6960,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 0,
    nickname: 'Push',
    exercises: [
      {
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1649802270622',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 4,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 4,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1649802270622',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 9,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6d3',
        },
        name: 'Medium Cable Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1649802270622',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 7,
          },
          {
            complete: true,
            repetitions: 6,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1649802270622',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b700',
        },
        name: 'Seated Dumbbell Overhead Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1649802270622',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 9,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b726',
        },
        name: 'Dumbbell Overhead Tricep Extensions',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'triceps',
        performedAt: {
          $date: {
            $numberLong: '1649802270622',
          },
        },
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1649802270622',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1649807826927',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1649807826927',
      },
    },
    durationInSeconds: 5556,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 2,
    nickname: 'Legs',
    exercises: [
      {
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1649107918220',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b74c',
        },
        name: 'Barbell Back Squat',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1649107918220',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 45,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 45,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 45,
            repetitions: 15,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b760',
        },
        name: 'Lying Single Leg Curl Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1649107918220',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 45,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 45,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 45,
            repetitions: 15,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b75d',
        },
        name: 'Single Leg Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1649107918220',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 190,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 190,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 175,
            repetitions: 15,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b76c',
        },
        name: 'Seated Calf Raise Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'calves',
        performedAt: {
          $date: {
            $numberLong: '1649107918220',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1649107918220',
          },
        },
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1649107918220',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1649114070971',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1649114070971',
      },
    },
    durationInSeconds: 6152,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 2,
    nickname: 'Legs',
    exercises: [
      {
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1649974353836',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b74c',
        },
        name: 'Barbell Back Squat',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1649974353836',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 14,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 15,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b760',
        },
        name: 'Lying Single Leg Curl Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1649974353836',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b75d',
        },
        name: 'Single Leg Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1649974353836',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 200,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 200,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 200,
            repetitions: 15,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b76c',
        },
        name: 'Seated Calf Raise Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'calves',
        performedAt: {
          $date: {
            $numberLong: '1649974353836',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1649974353836',
          },
        },
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1649974353836',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1649979783784',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1649979783784',
      },
    },
    durationInSeconds: 5429,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 2,
    nickname: 'Pull',
    exercises: [
      {
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1649716049490',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 9,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1649716049490',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1649716049490',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b70c',
        },
        name: 'Dumbbell Lateral Raise',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1649716049490',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 7,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1649716049490',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: false,
            resistanceInPounds: 80,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b719',
        },
        name: 'Dumbbell Hammer Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1649716049490',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 15,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 15,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 15,
            repetitions: 15,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b736',
        },
        name: 'Decline Situps - Weighted',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1649716049490',
          },
        },
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1649716049490',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1649721118061',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1649721118061',
      },
    },
    durationInSeconds: 5068,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 1,
    nickname: 'Pull',
    exercises: [
      {
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1649888821778',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            repetitions: 14,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 6,
          },
          {
            complete: true,
            repetitions: 7,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1649888821778',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 245,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 245,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1649888821778',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 160,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 160,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b6e9',
        },
        name: 'Neutral Grip Lat Pulldown',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1649888821778',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b70c',
        },
        name: 'Dumbbell Lateral Raise',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1649888821778',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 9,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 9,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 7,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1649888821778',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 8,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b719',
        },
        name: 'Dumbbell Hammer Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1649888821778',
          },
        },
      },
      {
        sets: [
          {
            complete: true,
            repetitions: 30,
          },
          {
            complete: true,
            repetitions: 25,
          },
          {
            complete: true,
            repetitions: 16,
          },
        ],
        _id: {
          $oid: '622cf5ac671ab3d12676b740',
        },
        name: 'Hanging Leg Raise, Ab Station',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1649888821778',
          },
        },
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1649888821778',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1649894529480',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1649894529480',
      },
    },
    durationInSeconds: 5707,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 0,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1650317470407',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1650317470407',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 4,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 4,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d3',
        },
        name: 'Medium Cable Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1650317470407',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1650317470407',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 6,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b700',
        },
        name: 'Seated Dumbbell Overhead Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1650317470407',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 8,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b726',
        },
        name: 'Dumbbell Overhead Tricep Extensions',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'triceps',
        performedAt: {
          $date: {
            $numberLong: '1650323437566',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b740',
        },
        name: 'Hanging Leg Raise, Ab Station',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1650317470407',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 30,
          },
          {
            complete: true,
            repetitions: 25,
          },
          {
            complete: true,
            repetitions: 17,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1650317470412',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1650324288112',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1650324288112',
      },
    },
    durationInSeconds: 6817,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 1,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1650413848787',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1650413848787',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1650413848787',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 9,
          },
          {
            complete: false,
            resistanceInPounds: 225,
          },
          {
            complete: false,
            resistanceInPounds: 225,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1650413848791',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1650413874380',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1650413874380',
      },
    },
    durationInSeconds: 25,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 2,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1650497735582',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1650497735582',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 9,
          },
          {
            complete: true,
            repetitions: 7,
          },
          {
            complete: true,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1650497735582',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6fa',
        },
        name: 'Single-Arm Dumbbell Row',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1650501148847',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b70c',
        },
        name: 'Dumbbell Lateral Raise',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1650497735582',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1650497735582',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 8,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 6,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b736',
        },
        name: 'Decline Situps - Weighted',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1650497735582',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 20,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 20,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 20,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1650497735594',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1650504361924',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1650504361924',
      },
    },
    durationInSeconds: 6626,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 0,
    nickname: 'Legs',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1650577917688',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b74c',
        },
        name: 'Barbell Back Squat',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1650577917688',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
          {
            complete: false,
            resistanceInPounds: 205,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b760',
        },
        name: 'Lying Single Leg Curl Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1650577917688',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75d',
        },
        name: 'Single Leg Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1650577917688',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: false,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76c',
        },
        name: 'Seated Calf Raise Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'calves',
        performedAt: {
          $date: {
            $numberLong: '1650577917688',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 200,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 200,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 200,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1650577917688',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1650577917693',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1650582650315',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1650582650315',
      },
    },
    durationInSeconds: 4732,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 1,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1650667046830',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d3',
        },
        name: 'Medium Cable Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1650667046830',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 90,
            repetitions: 9,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1650667046830',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b700',
        },
        name: 'Seated Dumbbell Overhead Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1650667046830',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b720',
        },
        name: 'Standing Cable Tricep Pushdown - Rope',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'triceps',
        performedAt: {
          $date: {
            $numberLong: '1650669637961',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 85,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 85,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b740',
        },
        name: 'Hanging Leg Raise, Ab Station',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1650667046830',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 30,
          },
          {
            complete: true,
            repetitions: 25,
          },
          {
            complete: true,
            repetitions: 20,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1650667046876',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1650671911381',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1650671911381',
      },
    },
    durationInSeconds: 4864,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 2,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1650923846580',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 16,
          },
          {
            complete: true,
            repetitions: 7,
          },
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1650923846580',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e9',
        },
        name: 'Neutral Grip Lat Pulldown',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1650923846580',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b70c',
        },
        name: 'Dumbbell Lateral Raise',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1650923846580',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1650923846580',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 8,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b736',
        },
        name: 'Decline Situps - Weighted',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1650923846580',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1650923846587',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1650929528239',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1650929528239',
      },
    },
    durationInSeconds: 5681,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 3,
    nickname: 'Legs',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1651009759279',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b74c',
        },
        name: 'Barbell Back Squat',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1651009759279',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b760',
        },
        name: 'Lying Single Leg Curl Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1651009759279',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 14,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75d',
        },
        name: 'Single Leg Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1651009759279',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b744',
        },
        name: 'Kneeling Ab Wheel',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1651013425664',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 12,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1651009759279',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b763',
        },
        name: 'Roman Chair Back Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1651009759279',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 35,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 35,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 35,
            repetitions: 15,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1651009759284',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1651017086241',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1651017086241',
      },
    },
    durationInSeconds: 7326,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 4,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1651101746044',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1651101746044',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d8',
        },
        name: 'Chest Fly Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1651101746044',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 11,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 9,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1651101746044',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 11,
          },
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1651101746051',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1651106622440',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1651106622440',
      },
    },
    durationInSeconds: 4876,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 5,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e0',
        },
        name: 'Neutral Grip Pull Ups',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1651182511039',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 16,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 6,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1651182511039',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6fa',
        },
        name: 'Single-Arm Dumbbell Row',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1651182511039',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6cc',
        },
        name: 'Dumbbell Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1651185210261',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 40,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 40,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 40,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1651182511039',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 9,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b719',
        },
        name: 'Dumbbell Hammer Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1651182511039',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b740',
        },
        name: 'Hanging Leg Raise, Ab Station',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1651187026510',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 30,
          },
          {
            complete: true,
            repetitions: 25,
          },
          {
            complete: true,
            repetitions: 21,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1651182511043',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1651188035776',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1651188035776',
      },
    },
    durationInSeconds: 5524,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 0,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1651532035146',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 3,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d8',
        },
        name: 'Chest Fly Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1651528505906',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 12,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1651528505906',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1651528505906',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 13,
          },
          {
            complete: true,
            repetitions: 9,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b700',
        },
        name: 'Seated Dumbbell Overhead Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1651528505906',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 9,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 8,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1651528505912',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1651538028058',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1651538028058',
      },
    },
    durationInSeconds: 8045,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 1,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e0',
        },
        name: 'Neutral Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1651613507382',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 17,
          },
          {
            complete: true,
            repetitions: 11,
          },
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1651613507382',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 245,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 245,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6fa',
        },
        name: 'Single-Arm Dumbbell Row',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1651613507382',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b70f',
        },
        name: 'Dumbbell Bent Over Reverse Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1651613507382',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1651613507382',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 8,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b719',
        },
        name: 'Dumbbell Hammer Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1651613507382',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b736',
        },
        name: 'Decline Situps - Weighted',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1651613507382',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1651613507389',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1651618863690',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1651618863689',
      },
    },
    durationInSeconds: 5356,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 2,
    nickname: 'Legs',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b74c',
        },
        name: 'Barbell Back Squat',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1651702866561',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b760',
        },
        name: 'Lying Single Leg Curl Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1651702866561',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75d',
        },
        name: 'Single Leg Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1651702866561',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b767',
        },
        name: 'Leg Spread Abduction Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'abductors',
        performedAt: {
          $date: {
            $numberLong: '1651702866561',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 130,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 160,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 190,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1651702866561',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b763',
        },
        name: 'Roman Chair Back Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1651702866561',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 45,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 45,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 45,
            repetitions: 12,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1651702866561',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1651702866564',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1651709446734',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1651709446733',
      },
    },
    durationInSeconds: 6580,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 3,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1651880278456',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6cc',
        },
        name: 'Dumbbell Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1651880312452',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 40,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1651880278456',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 13,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d4',
        },
        name: 'Low Cable Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1651880387844',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 36,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 36,
            repetitions: 15,
          },
          {
            complete: false,
            resistanceInPounds: 36,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1651880278459',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1651929559458',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1651929559458',
      },
    },
    durationInSeconds: 2639,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 4,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1652133365090',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 13,
          },
          {
            complete: true,
            repetitions: 9,
          },
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1652133365090',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 245,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 265,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1652133365090',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e9',
        },
        name: 'Neutral Grip Lat Pulldown',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1652133365090',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b70c',
        },
        name: 'Dumbbell Lateral Raise',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1652133365090',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 12,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1652133365090',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 8,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b736',
        },
        name: 'Decline Situps - Weighted',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1652133365090',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1652133365098',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1652142726816',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1652142726815',
      },
    },
    durationInSeconds: 9361,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 5,
    nickname: 'Legs',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b74c',
        },
        name: 'Barbell Back Squat',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1652224422064',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b760',
        },
        name: 'Lying Single Leg Curl Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1652224422064',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75d',
        },
        name: 'Single Leg Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1652224422064',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 8,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76c',
        },
        name: 'Seated Calf Raise Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'calves',
        performedAt: {
          $date: {
            $numberLong: '1652224422064',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1652224422064',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b763',
        },
        name: 'Roman Chair Back Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1652224422064',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 45,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 10,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1652224422067',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1652229263589',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1652229263589',
      },
    },
    durationInSeconds: 4841,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 0,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1652391188983',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 3,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 3,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 3,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d8',
        },
        name: 'Chest Fly Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1652391188983',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1652391188983',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1652391188983',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 13,
          },
          {
            complete: true,
            repetitions: 9,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1652391188988',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1652395081772',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1652395081772',
      },
    },
    durationInSeconds: 3892,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 1,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1653064124945',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 8,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 5,
          },
          {
            complete: false,
            resistanceInPounds: 135,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1653066376384',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1653064124945',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b72b',
        },
        name: 'EZ Bar Skull Crusher',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'triceps',
        performedAt: {
          $date: {
            $numberLong: '1653066400937',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b744',
        },
        name: 'Kneeling Ab Wheel',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1653066427329',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 6,
          },
          {
            complete: true,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b763',
        },
        name: 'Roman Chair Back Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1653066738665',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1653064124952',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1653093149043',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1653093149043',
      },
    },
    durationInSeconds: 4444,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 2,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1653346213870',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 2,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 2,
          },
          {
            complete: false,
            resistanceInPounds: 185,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d8',
        },
        name: 'Chest Fly Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1653346213870',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 12,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1653346213870',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1653346213870',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 14,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1653346213875',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1653350848672',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1653350848672',
      },
    },
    durationInSeconds: 4634,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 3,
    nickname: 'Legs',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b74c',
        },
        name: 'Barbell Back Squat',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1653434090343',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b760',
        },
        name: 'Lying Single Leg Curl Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1653434090343',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75d',
        },
        name: 'Single Leg Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1653434090343',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1653434090343',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b763',
        },
        name: 'Roman Chair Back Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1653434090343',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1653434090343',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1653434090347',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1653437602615',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1653437602615',
      },
    },
    durationInSeconds: 3512,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 4,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1653604025003',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 3,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 2,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1653604025003',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 6,
          },
          {
            complete: false,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b700',
        },
        name: 'Seated Dumbbell Overhead Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1653604025003',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b744',
        },
        name: 'Kneeling Ab Wheel',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1653607992492',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1653604025007',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1653608516253',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1653608516253',
      },
    },
    durationInSeconds: 4452,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 5,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1653693263945',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 12,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1653693263945',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 245,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 245,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1653693263945',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e9',
        },
        name: 'Neutral Grip Lat Pulldown',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1653693263945',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b70c',
        },
        name: 'Dumbbell Lateral Raise',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1653693263945',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 12,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b719',
        },
        name: 'Dumbbell Hammer Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1653693263945',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: false,
            resistanceInPounds: 80,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1653693263959',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1653702106102',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1653702106102',
      },
    },
    durationInSeconds: 6074,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 0,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1654033016158',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 3,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 2,
          },
          {
            complete: false,
            resistanceInPounds: 205,
          },
          {
            complete: false,
            resistanceInPounds: 205,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1654033016158',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1654033016158',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 14,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1654033016164',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1654119613435',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1654119613435',
      },
    },
    durationInSeconds: 3069,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 1,
    nickname: 'Legs',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b74c',
        },
        name: 'Barbell Back Squat',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1654210640242',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b760',
        },
        name: 'Lying Single Leg Curl Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1654210640242',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76c',
        },
        name: 'Seated Calf Raise Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'calves',
        performedAt: {
          $date: {
            $numberLong: '1654210640242',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 220,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 220,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1654210640242',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1654210640246',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1654213654611',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1654213654611',
      },
    },
    durationInSeconds: 3014,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 2,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1654552395866',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 2,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 2,
          },
          {
            complete: false,
            resistanceInPounds: 175,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d8',
        },
        name: 'Chest Fly Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1654552395866',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 13,
            resistanceInPounds: 70,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 11,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1654552395866',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1654552395866',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b720',
        },
        name: 'Standing Cable Tricep Pushdown - Rope',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'triceps',
        performedAt: {
          $date: {
            $numberLong: '1654552395866',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 85,
            repetitions: 13,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1654552395870',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1654559308031',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1654559308031',
      },
    },
    durationInSeconds: 6912,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 3,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1654638520239',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 16,
          },
          {
            complete: true,
            repetitions: 11,
          },
          {
            complete: true,
            repetitions: 9,
          },
          {
            complete: true,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1654638520239',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 255,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 275,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1654638520239',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e9',
        },
        name: 'Neutral Grip Lat Pulldown',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1654638520239',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 14,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b70c',
        },
        name: 'Dumbbell Lateral Raise',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1654638520239',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1654638520242',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1654643949743',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1654643949743',
      },
    },
    durationInSeconds: 5429,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 4,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1655760561389',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: false,
            resistanceInPounds: 205,
          },
          {
            complete: false,
            resistanceInPounds: 185,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1655760561389',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1655760561389',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 12,
          },
          {
            complete: true,
            repetitions: 7,
          },
          {
            complete: false,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1655760561395',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1655765265770',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1655765265769',
      },
    },
    durationInSeconds: 4704,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 5,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1656020371105',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 3,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 2,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d8',
        },
        name: 'Chest Fly Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1656020371105',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1656020371105',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1656020371105',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b700',
        },
        name: 'Seated Dumbbell Overhead Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1656020371105',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b736',
        },
        name: 'Decline Situps - Weighted',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1656025994763',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 4,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1656020371110',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1656026657357',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1656026657357',
      },
    },
    durationInSeconds: 6142,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 0,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1656366984019',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e9',
        },
        name: 'Neutral Grip Lat Pulldown',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1656366984019',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1656366984019',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: false,
            resistanceInPounds: 75,
          },
          {
            complete: false,
            resistanceInPounds: 75,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1656366984024',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1656371768280',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1656371768280',
      },
    },
    durationInSeconds: 4784,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 1,
    nickname: 'Legs',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b74c',
        },
        name: 'Barbell Back Squat',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1656539971653',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b767',
        },
        name: 'Leg Spread Abduction Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'abductors',
        performedAt: {
          $date: {
            $numberLong: '1656539971653',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 190,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1656539971653',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: false,
            resistanceInPounds: 60,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b763',
        },
        name: 'Roman Chair Back Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1656539971653',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 12,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1656539971653',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1656539971658',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1656627924915',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1656627924915',
      },
    },
    durationInSeconds: 6431,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 2,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1657314322470',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 2,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1657314322470',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 11,
          },
          {
            complete: true,
            repetitions: 7,
          },
          {
            complete: true,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b708',
        },
        name: 'Selector Overhead Press Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1657317998733',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 80,
            repetitions: 10,
          },
          {
            complete: false,
            resistanceInPounds: 80,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1657314322473',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1657318337013',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1657318337013',
      },
    },
    durationInSeconds: 3522,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 3,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1658181335963',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 3,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1658181335963',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1658181335963',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 12,
          },
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1658181335968',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1658268445771',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1658268445771',
      },
    },
    durationInSeconds: 6724,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 4,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e0',
        },
        name: 'Neutral Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1658268449050',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1658272668256',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6fa',
        },
        name: 'Single-Arm Dumbbell Row',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1658268449050',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b70f',
        },
        name: 'Dumbbell Bent Over Reverse Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1658268449050',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1658268449050',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 8,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1658268449054',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1658274740763',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1658274740763',
      },
    },
    durationInSeconds: 6291,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 5,
    nickname: 'Legs',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b74c',
        },
        name: 'Barbell Back Squat',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1658355007926',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b760',
        },
        name: 'Lying Single Leg Curl Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1658355007926',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 13,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75d',
        },
        name: 'Single Leg Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1658355007926',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
          {
            complete: false,
            resistanceInPounds: 55,
          },
          {
            complete: false,
            resistanceInPounds: 55,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1658355007926',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1658355007930',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1658442233410',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1658442233410',
      },
    },
    durationInSeconds: 5783,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 0,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1658442256775',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1658445144033',
          },
        },
        sets: [
          {
            timeInSeconds: 1800,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1658442256775',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 9,
          },
          {
            complete: true,
            repetitions: 7,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1658442256782',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1658445804457',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1658445804457',
      },
    },
    durationInSeconds: 3547,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 1,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1658876536553',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1658876536553',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 7,
          },
          {
            complete: true,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1658876536553',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1658876536557',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1658928123191',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1658928123191',
      },
    },
    durationInSeconds: 4657,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 2,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1659391719453',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1659391719453',
          },
        },
        sets: [
          {
            resistanceInPounds: 135,
            repetitions: 10,
            complete: true,
          },
          {
            resistanceInPounds: 185,
            repetitions: 5,
            complete: true,
          },
          {
            resistanceInPounds: 185,
            repetitions: 5,
            complete: true,
          },
          {
            resistanceInPounds: 185,
            repetitions: 5,
            complete: true,
          },
          {
            resistanceInPounds: 185,
            repetitions: 5,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1659391719453',
          },
        },
        sets: [
          {
            repetitions: 8,
            complete: true,
          },
          {
            repetitions: 6,
            complete: true,
          },
          {
            repetitions: 6,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d8',
        },
        name: 'Chest Fly Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1659394764027',
          },
        },
        sets: [
          {
            resistanceInPounds: 70,
            repetitions: 10,
            complete: true,
          },
          {
            resistanceInPounds: 70,
            repetitions: 10,
            complete: true,
          },
          {
            resistanceInPounds: 70,
            repetitions: 10,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b700',
        },
        name: 'Seated Dumbbell Overhead Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1659391719453',
          },
        },
        sets: [
          {
            resistanceInPounds: 100,
            repetitions: 10,
            complete: true,
          },
          {
            resistanceInPounds: 100,
            repetitions: 10,
            complete: true,
          },
          {
            resistanceInPounds: 100,
            repetitions: 3,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b740',
        },
        name: 'Hanging Leg Raise, Ab Station',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1659391719453',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 30,
          },
          {
            complete: true,
            repetitions: 25,
          },
          {
            complete: true,
            repetitions: 21,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1659391719459',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1659396713065',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1659396713065',
      },
    },
    durationInSeconds: 4993,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 3,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1659477491347',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e0',
        },
        name: 'Neutral Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1659477491347',
          },
        },
        sets: [
          {
            repetitions: 16,
            complete: true,
          },
          {
            repetitions: 10,
            complete: true,
          },
          {
            repetitions: 7,
            complete: true,
          },
          {
            repetitions: 7,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1659477491347',
          },
        },
        sets: [
          {
            resistanceInPounds: 225,
            repetitions: 10,
            complete: true,
          },
          {
            resistanceInPounds: 225,
            repetitions: 10,
            complete: true,
          },
          {
            resistanceInPounds: 225,
            repetitions: 10,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6fa',
        },
        name: 'Single-Arm Dumbbell Row',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1659477491347',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 5,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1659477491352',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1659482634664',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1659482634664',
      },
    },
    durationInSeconds: 5143,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 4,
    nickname: 'Legs',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1659565235320',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b74c',
        },
        name: 'Barbell Back Squat',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1659565235320',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b760',
        },
        name: 'Lying Single Leg Curl Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1659565235320',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75d',
        },
        name: 'Single Leg Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1659565235320',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 55,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76c',
        },
        name: 'Seated Calf Raise Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'calves',
        performedAt: {
          $date: {
            $numberLong: '1659565235320',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 190,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 190,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 190,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1659565235320',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b763',
        },
        name: 'Roman Chair Back Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1659565235320',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1659565235325',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1659571741925',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1659571741925',
      },
    },
    durationInSeconds: 6506,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 5,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1659733554107',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1659733554107',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1659733554107',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 11,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d8',
        },
        name: 'Chest Fly Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1659733554107',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b700',
        },
        name: 'Seated Dumbbell Overhead Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1659733554107',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 6,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 6,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b720',
        },
        name: 'Standing Cable Tricep Pushdown - Rope',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'triceps',
        performedAt: {
          $date: {
            $numberLong: '1659733554107',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 85,
            repetitions: 15,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1659733554109',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1659740179817',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1659740179816',
      },
    },
    durationInSeconds: 6625,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 0,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1659995747807',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1659995747807',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 9,
          },
          {
            complete: true,
            repetitions: 6,
          },
          {
            complete: true,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1659995747807',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e9',
        },
        name: 'Neutral Grip Lat Pulldown',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1659995747807',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b70c',
        },
        name: 'Dumbbell Lateral Raise',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1659995747807',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b719',
        },
        name: 'Dumbbell Hammer Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1659995747807',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1659995747810',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1660001289973',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1660001289973',
      },
    },
    durationInSeconds: 5542,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 1,
    nickname: 'Legs',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1660083456209',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b767',
        },
        name: 'Leg Spread Abduction Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'abductors',
        performedAt: {
          $date: {
            $numberLong: '1660083456209',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1660083456209',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 15,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1660083456213',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1660087116924',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1660087116924',
      },
    },
    durationInSeconds: 3660,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 2,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1660167820579',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1660167820579',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 135,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 4,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 3,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1660167820579',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 6,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d2',
        },
        name: 'High Cable Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1660171811211',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 20,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 23,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 23,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b700',
        },
        name: 'Seated Dumbbell Overhead Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1660167820579',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b726',
        },
        name: 'Dumbbell Overhead Tricep Extensions',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'triceps',
        performedAt: {
          $date: {
            $numberLong: '1660167820579',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b736',
        },
        name: 'Decline Situps - Weighted',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1660174321930',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 20,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 20,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 20,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1660167820583',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1660174747006',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1660174747005',
      },
    },
    durationInSeconds: 6840,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 3,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1660342151449',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e0',
        },
        name: 'Neutral Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1660342151449',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 16,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 9,
          },
          {
            complete: true,
            repetitions: 8,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1660342151449',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6fa',
        },
        name: 'Single-Arm Dumbbell Row',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1660342151449',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b70f',
        },
        name: 'Dumbbell Bent Over Reverse Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1660342151449',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 30,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1660342151449',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b719',
        },
        name: 'Dumbbell Hammer Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1660342151449',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 8,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b744',
        },
        name: 'Kneeling Ab Wheel',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1660348166718',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 3,
          },
          {
            complete: false,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1660342151451',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1660349172372',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1660349172372',
      },
    },
    durationInSeconds: 7020,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 4,
    nickname: 'Legs',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1660599942886',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b74c',
        },
        name: 'Barbell Back Squat',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1660599942886',
          },
        },
        sets: [
          {
            resistanceInPounds: 135,
            repetitions: 10,
            complete: true,
          },
          {
            resistanceInPounds: 185,
            repetitions: 10,
            complete: true,
          },
          {
            resistanceInPounds: 185,
            repetitions: 10,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b760',
        },
        name: 'Lying Single Leg Curl Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1660599942886',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75d',
        },
        name: 'Single Leg Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1660599942886',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76c',
        },
        name: 'Seated Calf Raise Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'calves',
        performedAt: {
          $date: {
            $numberLong: '1660599942886',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b749',
        },
        name: 'Standing Dumbbell Side Bend',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'obliques',
        performedAt: {
          $date: {
            $numberLong: '1660599942886',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 15,
            resistanceInPounds: 65,
          },
          {
            complete: true,
            resistanceInPounds: 65,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b763',
        },
        name: 'Roman Chair Back Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1660599942886',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 25,
            repetitions: 12,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1660599942890',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1660606394663',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1660606394662',
      },
    },
    durationInSeconds: 6451,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 5,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1660685818233',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1660685818233',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 185,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 4,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 205,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d9',
        },
        name: 'Dips',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1660685818233',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 15,
          },
          {
            complete: true,
            repetitions: 6,
          },
          {
            complete: true,
            repetitions: 7,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b700',
        },
        name: 'Seated Dumbbell Overhead Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1660685818233',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b720',
        },
        name: 'Standing Cable Tricep Pushdown - Rope',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'triceps',
        performedAt: {
          $date: {
            $numberLong: '1660685818233',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 100,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b73e',
        },
        name: 'Hanging Leg Raise - Weighted',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'abs',
        performedAt: {
          $date: {
            $numberLong: '1660691394360',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1660685818237',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1660692311907',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1660692311907',
      },
    },
    durationInSeconds: 6493,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 0,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1660775555517',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6dc',
        },
        name: 'Overhand Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1660775555517',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 14,
          },
          {
            complete: true,
            repetitions: 8,
          },
          {
            complete: true,
            repetitions: 7,
          },
          {
            complete: true,
            repetitions: 6,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1660775555517',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 275,
            repetitions: 4,
          },
          {
            complete: true,
            resistanceInPounds: 275,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e9',
        },
        name: 'Neutral Grip Lat Pulldown',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1660775555517',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 140,
            repetitions: 10,
          },
          {
            complete: false,
            resistanceInPounds: 140,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b70c',
        },
        name: 'Dumbbell Lateral Raise',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1660775555517',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 50,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b717',
        },
        name: 'EZ Bar Preacher Curl',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'biceps',
        performedAt: {
          $date: {
            $numberLong: '1660775555517',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 75,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1660775555521',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1660782720694',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1660782720694',
      },
    },
    durationInSeconds: 6647,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 1,
    nickname: 'Legs',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1660859386571',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b760',
        },
        name: 'Lying Single Leg Curl Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1660859386571',
          },
        },
        sets: [
          {
            resistanceInPounds: 65,
            repetitions: 15,
            complete: true,
          },
          {
            resistanceInPounds: 65,
            repetitions: 15,
            complete: true,
          },
          {
            resistanceInPounds: 65,
            repetitions: 15,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75d',
        },
        name: 'Single Leg Extension',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'quads',
        performedAt: {
          $date: {
            $numberLong: '1660859386571',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 15,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b767',
        },
        name: 'Leg Spread Abduction Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'abductors',
        performedAt: {
          $date: {
            $numberLong: '1660859386571',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 220,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 220,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 220,
            repetitions: 15,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1660859386580',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1660864318501',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1660864318501',
      },
    },
    durationInSeconds: 4931,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 2,
    nickname: 'Push',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1660947158592',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6c8',
        },
        name: 'Barbell Bench Press',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1660947158592',
          },
        },
        sets: [
          {
            resistanceInPounds: 135,
            repetitions: 10,
            complete: true,
          },
          {
            resistanceInPounds: 205,
            repetitions: 5,
            complete: true,
          },
          {
            resistanceInPounds: 205,
            repetitions: 5,
            complete: true,
          },
          {
            resistanceInPounds: 205,
            complete: true,
            repetitions: 5,
          },
          {
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6d8',
        },
        name: 'Chest Fly Machine',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'chest',
        performedAt: {
          $date: {
            $numberLong: '1660949767424',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 12,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 70,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1660947158597',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1660950245991',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1660950245991',
      },
    },
    durationInSeconds: 3087,
  },
  {
    userId: 'emdgoudie@gmail.com',
    dayNumber: 3,
    nickname: 'Pull',
    exercises: [
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b76f',
        },
        name: 'Running',
        exerciseType: 'timed',
        primaryMuscleGroup: 'cardio',
        performedAt: {
          $date: {
            $numberLong: '1661205128031',
          },
        },
        sets: [
          {
            timeInSeconds: 900,
            complete: true,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6e0',
        },
        name: 'Neutral Grip Pull Ups',
        exerciseType: 'rep_based',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1661205128031',
          },
        },
        sets: [
          {
            complete: true,
            repetitions: 13,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 10,
          },
          {
            complete: true,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b75e',
        },
        name: 'Barbell Deadlift',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'hamstrings',
        performedAt: {
          $date: {
            $numberLong: '1661205128031',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
          {
            complete: true,
            resistanceInPounds: 225,
            repetitions: 5,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b6fa',
        },
        name: 'Single-Arm Dumbbell Row',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'lats',
        performedAt: {
          $date: {
            $numberLong: '1661205128031',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
          {
            complete: true,
            resistanceInPounds: 60,
            repetitions: 10,
          },
        ],
      },
      {
        _id: {
          $oid: '622cf5ac671ab3d12676b70f',
        },
        name: 'Dumbbell Bent Over Reverse Fly',
        exerciseType: 'weighted',
        primaryMuscleGroup: 'shoulders',
        performedAt: {
          $date: {
            $numberLong: '1661205128031',
          },
        },
        sets: [
          {
            complete: true,
            resistanceInPounds: 40,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 40,
            repetitions: 15,
          },
          {
            complete: true,
            resistanceInPounds: 40,
            repetitions: 10,
          },
        ],
      },
    ],
    createdAt: {
      $date: {
        $numberLong: '1661205128034',
      },
    },
    updatedAt: {
      $date: {
        $numberLong: '1661212717240',
      },
    },
    endedAt: {
      $date: {
        $numberLong: '1661212717240',
      },
    },
    durationInSeconds: 6542,
  },
];

async function main() {
  const mappedData: any[] = DATA.map((item) => ({
    ...item,
    createdAt: new Date(parseInt(item.createdAt.$date.$numberLong)),
    endedAt: new Date(parseInt(item.endedAt.$date.$numberLong)),
    updatedAt: new Date(parseInt(item.updatedAt.$date.$numberLong)),
  }));

  mappedData.forEach(async ({ exercises, ...workout }) => {
    const insertedWorkout = await prisma.workout.create({
      data: { ...workout },
    });
    exercises.forEach(async ({ _id, sets, ...exercise }: any) => {
      await prisma.workoutExercise.create({
        data: {
          ...exercise,
          performedAt: new Date(
            parseInt(exercise.performedAt.$date.$numberLong)
          ),
          sets: { create: sets },
          workout: {
            connect: {
              id: insertedWorkout.id,
            },
          },
        },
      });
    });
  });
}

main()
  .then(async () => {
    console.log('done');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
