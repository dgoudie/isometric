import React, { useCallback, useRef } from 'react';

import classNames from 'classnames';
import styles from './SpinButton.module.scss';

type Props = {
  className?: string;
};

export default function SpinButton({
  className,
  children,
}: React.PropsWithChildren<Props>) {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  const closeDetails = useCallback(() => {
    detailsRef.current && (detailsRef.current.open = false);
  }, [detailsRef]);
  return (
    <details
      className={classNames(className, 'spin-button', styles.root)}
      ref={detailsRef}
    >
      <summary className={styles.summary}>
        <i className='fa-solid fa-ellipsis-vertical'></i>
      </summary>
      <div className={styles.detailsBody} onClick={closeDetails}>
        {children}
      </div>
    </details>
  );
}
