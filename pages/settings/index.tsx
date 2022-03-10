import type { GetServerSideProps, NextPage } from 'next';

import AppBarWithTextHeaderLayout from '../../components/AppBarWithTextHeaderLayout/AppBarWithTextHeaderLayout';
import Head from 'next/head';
import React from 'react';

type Props = {};

const Exercises: NextPage<Props> = ({}) => {
    return (
        <AppBarWithTextHeaderLayout text='Settings'>
            <Head>
                <title>Settings | {process.env.APP_NAME}</title>
            </Head>
            Some Settings
        </AppBarWithTextHeaderLayout>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    return { props: {} };
};

export default Exercises;
