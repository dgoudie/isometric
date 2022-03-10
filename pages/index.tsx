import AppBarLayout from '../components/AppBarLayout/AppBarLayout';
import Head from 'next/head';
import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {
    return (
        <AppBarLayout>
            <Head>
                <title>Home | ISOMETRIC</title>
            </Head>
            hello
        </AppBarLayout>
    );
};

export default Home;
