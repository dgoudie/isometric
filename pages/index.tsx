import type { GetServerSideProps, NextPage } from 'next';

import React from 'react';

const Root: NextPage = () => {
    return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    res.writeHead(301, { location: '/home' }).end();
    return { props: {} };
};

export default Root;
