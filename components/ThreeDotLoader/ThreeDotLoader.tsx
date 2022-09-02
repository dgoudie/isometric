import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { secondsToMilliseconds } from 'date-fns';
import styles from './ThreeDotLoader.module.scss';

interface Props {
  text?: string;
  className?: string;
}

export default function ThreeDotLoader({ text = 'Loading', className }: Props) {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const interval = setTimeout(
      () => setCounter(counter === 3 ? 1 : counter + 1),
      secondsToMilliseconds(0.25)
    );
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  return (
    <span className={classNames(styles.root, className)}>
      {text}
      <span className={styles.dots}>{'.'.repeat(counter)}</span>
    </span>
  );
}
