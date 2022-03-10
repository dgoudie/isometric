import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import styles from './AppBarLayout.module.scss';
import { useRouter } from 'next/router';

type Props = {};

export default function AppBarLayout({
    children,
}: React.PropsWithChildren<Props>) {
    return (
        <div className={styles.root}>
            <div className={styles.body}>{children}</div>
            <div className={styles.bar}>
                <div className={styles.barInner}>
                    <AppBarButton
                        href='/home'
                        text='Home'
                        iconClass='fa-house'
                    />
                    <AppBarButton
                        href='/exercises'
                        text='Exercises'
                        iconClass='fa-dumbbell'
                    />
                    <AppBarButton
                        href='/workouts'
                        text='Workouts'
                        iconClass='fa-list-check'
                    />
                </div>
            </div>
        </div>
    );
}

type AppBarButtonProps = {
    href: string;
    text: string;
    iconClass: string;
};

function AppBarButton({ href, text, iconClass }: AppBarButtonProps) {
    const { asPath } = useRouter();
    return (
        <Link href={href}>
            <a className={classNames(asPath.startsWith(href) && styles.active)}>
                <i className={classNames('fa-solid', iconClass)}></i>
                {text}
            </a>
        </Link>
    );
}
