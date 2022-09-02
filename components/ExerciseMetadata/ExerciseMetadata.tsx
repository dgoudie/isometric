import { Exercise } from '@prisma/client';
import { ExerciseWithPersonalBestAndLastPerformed } from '../../database/domains/exercise';
import React from 'react';
import { addSeconds } from 'date-fns';
import classNames from 'classnames';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import styles from './ExerciseMetadata.module.scss';

interface Props {
  exercise: ExerciseWithPersonalBestAndLastPerformed;
  className?: string;
}

const format = new Intl.DateTimeFormat('en-US');

export default function ExerciseMetadata({ exercise, className }: Props) {
  let itemMetaLineOne = (
    <li>
      PR: <span className={styles.metaNone}>None</span>
    </li>
  );
  if (!!exercise.personalBest) {
    switch (exercise.exerciseType) {
      case 'rep_based': {
        itemMetaLineOne = (
          <li>
            PR: {exercise.personalBest.repetitions} reps (
            {format.format(new Date(exercise.personalBest.performedAt))})
          </li>
        );
        break;
      }
      case 'timed': {
        itemMetaLineOne = (
          <li>
            PR:{' '}
            {formatDistanceStrict(
              addSeconds(new Date(), exercise.personalBest.timeInSeconds!),
              new Date()
            )}{' '}
            ({format.format(new Date(exercise.personalBest.performedAt))})
          </li>
        );
        break;
      }
      default: {
        itemMetaLineOne = (
          <li>
            PR: {exercise.personalBest.resistanceInPounds} lbs,{' '}
            {exercise.personalBest.repetitions} reps (
            {format.format(new Date(exercise.personalBest.performedAt))})
          </li>
        );
      }
    }
  }

  let itemMetaLineTwo = (
    <li>
      Last Performed: <span className={styles.metaNone}>Never</span>
    </li>
  );

  if (!!exercise.lastPerformed) {
    itemMetaLineTwo = (
      <li>Last Performed: {format.format(new Date(exercise.lastPerformed))}</li>
    );
  }
  return (
    <ol className={classNames(styles.meta, className)}>
      {itemMetaLineOne}
      {itemMetaLineTwo}
    </ol>
  );
}
