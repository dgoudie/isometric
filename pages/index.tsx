import { Breadcrumb, Layout, Menu } from 'antd';

import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';
import styles from './index.module.less';

const { Header, Footer, Sider, Content } = Layout;

const Home: NextPage = () => {
    return (
        <Layout className='layout'>
            <Header className={styles.header}>{process.env.APP_NAME}</Header>
        </Layout>
    );
};

export default Home;
