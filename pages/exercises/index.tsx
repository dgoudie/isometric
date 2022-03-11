import React, { useMemo } from 'react';

import AppBarWithAppHeaderLayout from '../../components/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import Exercise from '../../mongoose/exercise/model';
import ExerciseMuscleGroupSelect from '../../components/ExerciseMuscleGroupSelect/ExerciseMuscleGroupSelect';
import Head from 'next/head';
import { IExercise } from '../../mongoose/exercise/interface';
import Link from 'next/link';
import MuscleGroupTag from '../../components/MuscleGroupTag/MuscleGroupTag';
import type { NextPage } from 'next';
import dbConnect from '../../mongoose/init';
import { initializeUserDataIfNecessary } from '../../utils/initialize-user';
import styles from './index.module.scss';
import { withUserId } from '../../utils/with-user-id';

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
                <ExerciseMuscleGroupSelect />
                <div className={styles.items}>{items}</div>
            </div>
        </AppBarWithAppHeaderLayout>
    );
};

export const getServerSideProps = withUserId<Props>(async ({}, userId) => {
    await dbConnect();
    await initializeUserDataIfNecessary(userId);
    const exercises = await Exercise.findByUserId(userId);
    return {
        props: { exercises },
    };
});

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
