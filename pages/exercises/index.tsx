import AppBarLayout from '../../components/AppBarLayout/AppBarLayout';
import Exercise from '../../mongoose/exercise/model';
import { ExerciseModel } from '../../mongoose/exercise/model';
import Head from 'next/head';
import type { NextPage } from 'next';
import React from 'react';
import dbConnect from '../../mongoose/init';
import { withUserId } from '../../utils/with-user-id';

interface Props {
    exercises: ExerciseModel[];
}

const Exercises: NextPage<Props & { userId: string }> = ({
    exercises,
    userId,
}) => {
    console.log('exercises', exercises);
    return (
        <AppBarLayout>
            <Head>
                <title>Exercises | ISOMETRIC</title>
            </Head>
            hello
        </AppBarLayout>
    );
};

export const getServerSideProps = withUserId<Props>(async ({}, userId) => {
    await dbConnect();
    const exercises = await Exercise.find({ userId }).exec();
    return { props: { exercises } };
});

export default Exercises;
