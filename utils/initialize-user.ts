import Exercise from '../mongoose/exercise/model';
import { IExercise } from '../mongoose/exercise/interface';
import Settings from '../mongoose/settings/model';

export const initializeUserDataIfNecessary = async (
    userId: string
): Promise<void> => {
    const userSettings = await Settings.findOne({ userId }).exec();
    if (!!userSettings) {
        return;
    }
    await new Settings({ userId }).save();
    await insertDefaultExercises(userId);
};

const insertDefaultExercises = async (userId: string) => {
    const exercises = DEFAULT_EXERCISES.map((exercise) => ({
        ...exercise,
        userId,
        weightType: exercise.weightType ?? 'standard',
    }));
    await Exercise.insertMany(exercises);
};

const DEFAULT_EXERCISES: Partial<IExercise>[] = [
    {
        name: 'Barbell Bench Press',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
    },
    {
        name: 'Incline Barbell Bench Press',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
    },
    {
        name: 'Decline Barbell Bench Press',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
    },
    {
        name: 'Dumbbell Bench Press',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
    },
    {
        name: 'Dumbbell Fly',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders'],
    },
    {
        name: 'Incline Dumbbell Bench Press',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
    },
    {
        name: 'Incline Dumbbell Fly',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders'],
    },
    {
        name: 'Decline Dumbbell Fly',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders'],
    },
    {
        name: 'Smith Machine Bench Press',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
    },
    {
        name: 'Smith Machine Incline Bench Press',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
    },
    {
        name: 'High Cable Fly',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders'],
    },
    {
        name: 'Medium Cable Fly',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders'],
    },
    {
        name: 'Low Cable Fly',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders'],
    },
    {
        name: 'Plate Loaded Chest Press Machine',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
    },
    {
        name: 'Plate Loaded Inline Chest Press Machine',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
    },
    {
        name: 'Selector Chest Press Machine',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
    },
    {
        name: 'Chest Fly Machine',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders'],
    },
    {
        name: 'Dips',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
    },
    {
        name: 'Weighted Dips',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
    },
    {
        name: 'Machine-Supported Dips',
        primaryMuscleGroup: 'chest',
        secondaryMuscleGroups: ['shoulders', 'triceps'],
        weightType: 'assisted',
    },
    {
        name: 'Overhand Grip Pull Ups',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Weighted Overhand Grip Pull Ups',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Wide Grip Pull Ups',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Weighted Wide Grip Pull Ups',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Neutral Grip Pull Ups',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Weighted Neutral Grip Pull Ups',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Underhand Grip Pull Ups',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Weighted Underhand Grip Pull Ups',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Machine-Supported Pull Ups - Overhand Grip',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
        weightType: 'standard',
    },
    {
        name: 'Machine-Supported Pull Ups - Wide Grip',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
        weightType: 'standard',
    },
    {
        name: 'Machine-Supported Pull Ups - Neutral Grip',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
        weightType: 'standard',
    },
    {
        name: 'Overhand Grip Lat Pulldown',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Wide Grip Lat Pulldown',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Neutral Grip Lat Pulldown',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Underhand Grip Lat Pulldown',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Behind The Neck Lat Pulldown',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['traps', 'biceps'],
    },
    {
        name: 'Lat Pulldown - Single Arm',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Overhand Grip Plate Loaded Lat Pulldown',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Neutral Grip Plate Loaded Lat Pulldown',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Underhand Grip Plate Loaded Lat Pulldown',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Neutral Grip Plate Loaded Lat Pulldown - Single Arm',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Underhand Grip Plate Loaded Lat Pulldown - Single Arm',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps'],
    },
    {
        name: 'Seated Cable Row - Overhand Grip',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps', 'traps'],
    },
    {
        name: 'Seated Cable Row - Underhand Grip',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps', 'traps'],
    },
    {
        name: 'Seated Cable Row - Neutral Grip',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps', 'traps'],
    },
    {
        name: 'Seated Cable Row - Wide Grip',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps', 'traps'],
    },
    {
        name: 'Seated Cable Row - Single Arm',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps', 'traps'],
    },
    {
        name: 'Bent-Over Barbell Row - Overhand Grip',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['lower back', 'biceps'],
    },
    {
        name: 'Bent-Over Barbell Row - Underhand Grip',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['lower back', 'biceps'],
    },
    {
        name: 'TBar Row',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['lower back', 'biceps'],
    },
    {
        name: 'Single-Arm Dumbbell',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps', 'obliques'],
    },
    {
        name: 'Standing Cable Pullover',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['triceps', 'chest'],
    },
    {
        name: 'Standing Cable Pullover - Single Arm',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['triceps', 'chest'],
    },
    {
        name: 'Flat Dumbbell Pullover',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['triceps', 'chest'],
    },
    {
        name: 'Decline Dumbbell Pullover',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['triceps', 'chest'],
    },
    {
        name: 'Selector Chest Supported Row Machine',
        primaryMuscleGroup: 'lats',
        secondaryMuscleGroups: ['biceps', 'traps'],
    },
    {
        name: 'Seated Dumbbell Overhead Press',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['triceps', 'traps'],
    },
    {
        name: 'Seated Dumbbell Overhead Press - Single Arm',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['triceps', 'traps'],
    },
    {
        name: 'Standing Barbell Overhead Press',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['triceps', 'traps'],
    },
    {
        name: 'Standing Barbell Behind The Neck Press',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['triceps', 'traps'],
    },
    {
        name: 'Smith Machine Overhead Press',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['triceps', 'traps'],
    },
    {
        name: 'Smith Machine Behind The Neck Press',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['triceps', 'traps'],
    },
    {
        name: 'Plate Loaded Machine Overhead Press',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['triceps', 'traps'],
    },
    {
        name: 'Plate Loaded Machine Overhead Press - Single Arm',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['triceps', 'traps'],
    },
    {
        name: 'Selector Overhead Press Machine',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['triceps', 'traps'],
    },
    {
        name: 'Barbell Upright Row',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['biceps', 'traps'],
    },
    {
        name: 'EZ Bar Upright Row',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['biceps', 'traps'],
    },
    {
        name: 'Cable Upright Row',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['biceps', 'traps'],
    },
    {
        name: 'Dumbbell Lateral Raise',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['traps'],
    },
    {
        name: 'Single Arm Cable Lateral Raise',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['traps'],
    },
    {
        name: 'Rear Delt Machine',
        primaryMuscleGroup: 'shoulders',
        secondaryMuscleGroups: ['traps'],
    },
];
