import {
  ExerciseMuscleGroup,
  ExerciseMuscleGroup as PrismaExerciseMuscleGroup,
} from '@prisma/client';
import chroma, { contrast } from 'chroma-js';

import classNames from 'classnames';
import styles from './MuscleGroupTag.module.scss';
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
  .colors(Object.keys(ExerciseMuscleGroup).length);

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
      {muscleGroup ? muscleGroup.toUpperCase().replace(/_/, ' ') : 'N/A'}
    </div>
  );
}
