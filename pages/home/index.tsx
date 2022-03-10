import type { GetServerSideProps, NextPage } from 'next';

import AppBarWithAppHeaderLayout from '../../components/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import Head from 'next/head';
import React from 'react';

type Props = {};

const Home: NextPage<Props> = ({}) => {
    return (
        <AppBarWithAppHeaderLayout>
            <Head>
                <title>Home | {process.env.APP_NAME}</title>
            </Head>
            hello
        </AppBarWithAppHeaderLayout>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    return { props: {} };
};

export default Home;
