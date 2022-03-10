import AppBarLayout from '../AppBarLayout/AppBarLayout';
import Link from 'next/link';
import styles from './AppBarWithAppHeaderLayout.module.scss';

type Props = {};

export default function AppBarWithAppHeaderLayout({
    children,
}: React.PropsWithChildren<Props>) {
    return (
        <AppBarLayout
            header={
                <header className={styles.topBar}>
                    <div className={styles.topBarTitle}>
                        {process.env.APP_NAME}
                    </div>
                    <Link href='/settings'>
                        <a className={styles.topBarSettingsLink}>
                            <i className='fa-solid fa-gear'></i>
                        </a>
                    </Link>
                </header>
            }
        >
            <div className={styles.body}>{children}</div>
        </AppBarLayout>
    );
}
