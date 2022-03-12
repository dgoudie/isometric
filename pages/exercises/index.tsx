import React, { useMemo } from 'react';

import AppBarWithAppHeaderLayout from '../../components/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { EJSON } from 'bson';
import Exercise from '../../mongoose/exercise/model';
import Head from 'next/head';
import { IExercise } from '../../mongoose/exercise/interface';
import Link from 'next/link';
import MuscleGroupTag from '../../components/MuscleGroupTag/MuscleGroupTag';
import type { NextPage } from 'next';
import dbConnect from '../../mongoose/init';
import { getServerSidePropsWithUserId } from '../../utils/with-user-id';
import { initializeUserDataIfNecessary } from '../../utils/initialize-user';
import mongoose from 'mongoose';
import styles from './index.module.scss';

interface Props {
    exercises: (IExercise & {
        _id: string;
    })[];
}

const Exercises: NextPage<Props> = ({ exercises }) => {
    const items = useMemo(
        () =>
            exercises.map((ex) => (
                <ExerciseButton key={ex._id} exercise={ex} />
            )),
        [exercises]
    );

    return (
        <AppBarWithAppHeaderLayout>
            <Head>
                <title>Exercises | {process.env.APP_NAME}</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.items}>{items}</div>
            </div>
        </AppBarWithAppHeaderLayout>
    );
};

export const getServerSideProps = getServerSidePropsWithUserId<Props>(
    async ({}, userId) => {
        await dbConnect();
        await initializeUserDataIfNecessary(userId);
        const exercises = await getExercises(userId);
        return {
            props: { exercises },
        };
    }
);

const getExercises = async (userId: string) => {
    const result = await Exercise.find({ userId }).sort({ name: 1 }).exec();
    return EJSON.deserialize(result) as (mongoose.Document<
        unknown,
        any,
        IExercise
    > &
        IExercise & {
            _id: string;
        })[];
};

export default Exercises;

interface ExerciseButtonProps {
    exercise: IExercise & {
        _id: string;
    };
}

const ExerciseButton = ({ exercise }: ExerciseButtonProps) => {
    const format = useMemo(() => new Intl.DateTimeFormat('en-US'), []);

    const muscleGroupTags = useMemo(
        () =>
            [
                exercise.primaryMuscleGroup,
                ...(exercise.secondaryMuscleGroups ?? []),
            ].map((group) => (
                <MuscleGroupTag
                    className={styles.itemMusclesItem}
                    key={`${exercise._id}_${group}`}
                    muscleGroup={group}
                />
            )),
        [exercise]
    );
    return (
        <Link href={`/exercises/${exercise.name}`}>
            <a className={styles.item}>
                <div className={styles.itemTitle}>{exercise.name}</div>
                <div className={styles.itemMuscles}>{muscleGroupTags}</div>
                <ol className={styles.itemMeta}>
                    <li>PR: 185 lbs ({format.format(new Date())})</li>
                    <li>Last Performed: {format.format(new Date())}</li>
                </ol>
            </a>
        </Link>
    );
};
