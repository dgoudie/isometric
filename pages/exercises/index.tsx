import AppBarWithAppHeaderLayout from '../../components/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
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

const Exercises: NextPage<Props> = ({ exercises }) => {
    console.log('exercises', exercises);
    return (
        <AppBarWithAppHeaderLayout>
            <Head>
                <title>Exercises | {process.env.APP_NAME}</title>
            </Head>
            Barbell Bench Press
        </AppBarWithAppHeaderLayout>
    );
};

export const getServerSideProps = withUserId<Props>(async ({}, userId) => {
    await dbConnect();
    const exercises = await Exercise.find({ userId }).exec();
    return {
        props: { exercises },
    };
});

export default Exercises;
