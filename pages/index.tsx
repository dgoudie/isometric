import type { GetServerSideProps, NextPage } from 'next';

import React from 'react';

const Root: NextPage = () => {
    return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    return { redirect: { permanent: true, destination: '/home' } };
};

export default Root;
