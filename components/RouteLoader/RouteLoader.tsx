import Loader from '../Loader/Loader';
import React from 'react';
import classNames from 'classnames';
import styles from './RouteLoader.module.scss';

interface Props {
  className?: string;
}

export default function RouteLoader({ className }: Props) {
  return (
    <div className={classNames(styles.routeLoader, className)}>
      <Loader />
    </div>
  );
}
