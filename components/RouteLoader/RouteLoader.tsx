import React from 'react';
import ThreeDotLoader from '../ThreeDotLoader/ThreeDotLoader';
import classNames from 'classnames';
import styles from './RouteLoader.module.scss';

interface Props {
  className?: string;
  text?: string;
}

export default function RouteLoader({ className, text }: Props) {
  return (
    <div className={classNames(styles.routeLoader, className)}>
      <ThreeDotLoader text={text} />
    </div>
  );
}
