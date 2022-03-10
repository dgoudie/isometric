import AppBarLayout from '../AppBarLayout/AppBarLayout';
import React from 'react';
import styles from './AppBarWithTextHeaderLayout.module.scss';

type Props = {
    text: string;
};

export default function AppBarWithTextHeaderLayout({
    children,
    text,
}: React.PropsWithChildren<Props>) {
    return (
        <AppBarLayout
            header={<header className={styles.topBar}>{text}</header>}
        >
            <div className={styles.body}>{children}</div>
        </AppBarLayout>
    );
}
