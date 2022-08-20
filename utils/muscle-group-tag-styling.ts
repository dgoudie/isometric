import {
  ExerciseMuscleGroup,
  ExerciseMuscleGroups,
} from '@dgoudie/isometric-types';
import chroma, { contrast } from 'chroma-js';

import { useMemo } from 'react';

export interface MuscleGroupStyles {
  backgroundColor: string;
  borderColor: string;
  color: string;
}

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

export const getMuscleGroupStyles = (
  group: ExerciseMuscleGroup | undefined
): MuscleGroupStyles => {
  const backgroundColor = group
    ? colorScale[ExerciseMuscleGroups.indexOf(group)]
    : 'var(--background-color)';
  let color = 'black';
  let borderColor = 'transparent';
  if (!group) {
    color = 'var(--color)';
    borderColor = 'var(--color)';
  } else if (contrast(backgroundColor, color) < 7) {
    color = 'white';
  }
  return {
    backgroundColor,
    borderColor,
    color,
  };
};

export const useMuscleGroupStyles = (
  group: ExerciseMuscleGroup | undefined
): MuscleGroupStyles => {
  return useMemo(() => getMuscleGroupStyles(group), [group]);
};
