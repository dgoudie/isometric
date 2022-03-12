import React, { useMemo } from 'react';

import AppBarWithAppHeaderLayout from '../../../components/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { EJSON } from 'bson';
import Exercise from '../../../mongoose/exercise/model';
import { IExercise } from '../../../mongoose/exercise/interface';
import { NextPage } from 'next';
import dbConnect from '../../../mongoose/init';
import mongoose from 'mongoose';
import { withUserId } from '../../../utils/with-user-id';

interface Props {
    exercise: IExercise & {
        _id: string;
    };
}

const ExerciseDetail: NextPage<Props> = ({ exercise }) => {
    return (
        <AppBarWithAppHeaderLayout>
            <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(exercise, null, 2)}
            </pre>
        </AppBarWithAppHeaderLayout>
    );
};

export const getServerSideProps = withUserId<Props>(
    async ({ query: { exercise_name } }, userId) => {
        if (typeof exercise_name !== 'string') {
            return { notFound: true };
        }
        await dbConnect();
        const exercise = await getExercise(userId, exercise_name);
        if (!exercise) {
            return { notFound: true };
        }
        return {
            props: { exercise },
        };
    }
);

const getExercise = async (userId: string, name: string) => {
    const result = await Exercise.findOne({ userId, name }).exec();
    return !result
        ? null
        : (EJSON.deserialize(result) as mongoose.Document<
              unknown,
              any,
              IExercise
          > &
              IExercise & {
                  _id: string;
              });
};

export default ExerciseDetail;
