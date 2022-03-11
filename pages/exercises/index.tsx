import AppBarWithAppHeaderLayout from '../../components/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { EJSON } from 'bson';
import Exercise from '../../mongoose/exercise/model';
import { ExerciseModel } from '../../mongoose/exercise/model';
import Head from 'next/head';
import type { NextPage } from 'next';
import React from 'react';
import { Schema } from 'mongoose';
import dbConnect from '../../mongoose/init';
import { initializeUserDataIfNecessary } from '../../utils/initialize-user';
import { withUserId } from '../../utils/with-user-id';

interface Props {
    exercises: (ExerciseModel & {
        _id: string;
    })[];
}

const Exercises: NextPage<Props> = ({ exercises }) => {
    return (
        <AppBarWithAppHeaderLayout>
            <Head>
                <title>Exercises | {process.env.APP_NAME}</title>
            </Head>
            <ol>
                {exercises.map((e) => (
                    <li key={e._id}>{e.name}</li>
                ))}
            </ol>
        </AppBarWithAppHeaderLayout>
    );
};

export const getServerSideProps = withUserId<Props>(async ({}, userId) => {
    await dbConnect();
    await initializeUserDataIfNecessary(userId);
    const exercises = EJSON.deserialize(
        await Exercise.find({ userId }).exec()
    ) as (ExerciseModel & {
        _id: string;
    })[];
    return {
        props: { exercises },
    };
});

export default Exercises;
