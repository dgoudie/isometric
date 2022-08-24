import {
  ExerciseMuscleGroup,
  ExerciseMuscleGroups,
} from '@dgoudie/isometric-types';
import chroma, { contrast } from 'chroma-js';

import { ExerciseMuscleGroup as PrismaExerciseMuscleGroup } from '@prisma/client';
import classNames from 'classnames';
import styles from './MuscleGroupTag.module.scss';
import { useMemo } from 'react';
import { useMuscleGroupStyles } from '../../utils/muscle-group-tag-styling';

const colorScale = chroma
  .scale([
    'red',
    'orange',
    'yellow',
    'limegreen',
    'lightblue',
    'violet',
    'hotpink',
  ])
  .mode('lch')
  .colors(ExerciseMuscleGroups.length);

interface Props {
  muscleGroup?: ExerciseMuscleGroup | PrismaExerciseMuscleGroup;
  className?: string;
}

export default function MuscleGroupTag({ muscleGroup, className }: Props) {
  const muscleGroupStyles = useMuscleGroupStyles(muscleGroup);
  return (
    <div
      className={classNames(className, styles.item)}
      style={muscleGroupStyles}
    >
      {muscleGroup ? muscleGroup.toUpperCase() : 'N/A'}
    </div>
  );
}
