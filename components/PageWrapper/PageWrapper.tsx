import React from 'react';
import styles from './PageWrapper.module.scss';
export default function PageWrapper({ children }: React.PropsWithChildren<{}>) {
  return <div className={styles.pageWrapper}>{children}</div>;
}
