import { ExerciseMuscleGroup } from '@prisma/client';
import React from 'react';
import classNames from 'classnames';
import styles from './MuscleGroupPicker.module.scss';
import { useMuscleGroupStyles } from '../../utils/muscle-group-tag-styling';

interface Props {
  className?: string;
  value?: ExerciseMuscleGroup;
  valueChanged?: (value?: ExerciseMuscleGroup) => void;
  disabled?: boolean;
  required?: boolean;
}
export default function MuscleGroupPicker({
  className,
  value,
  valueChanged,
  required = false,
  disabled,
}: Props) {
  const muscleGroupStyles = useMuscleGroupStyles(value);

  return (
    <select
      required={required}
      disabled={disabled}
      className={classNames(styles.root, className)}
      style={muscleGroupStyles}
      value={value}
      onChange={(e) =>
        valueChanged &&
        valueChanged((e.target.value as ExerciseMuscleGroup) ?? undefined)
      }
    >
      <option value={''}>N/A</option>
      {Object.keys(ExerciseMuscleGroup)
        .sort()
        .map((group) => (
          <option key={group}>{group}</option>
        ))}
    </select>
  );
}
