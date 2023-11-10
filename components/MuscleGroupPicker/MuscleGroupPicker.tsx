import { ExerciseMuscleGroup } from '@prisma/client';
import { MdIcon } from '../material/MdIcon';
import { MdOutlinedSelect } from '../material/MdOutlinedSelect';
import { MdSelectOption } from '../material/MdSelectOption';
import { MdOutlinedSelect as _MdOutlinedSelect } from '@material/web/select/outlined-select';
import classNames from 'classnames';
import styles from './MuscleGroupPicker.module.scss';
import { useCallback } from 'react';
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
  const muscleGroupsSorted = Object.keys(
    ExerciseMuscleGroup
  ).sort() as ExerciseMuscleGroup[];
  const muscleGroupStyles = useMuscleGroupStyles(value);
  const changed = useCallback(
    (event: Event) => {
      const target = event.target as _MdOutlinedSelect;
      console.log(target.selectedIndex);
      if (valueChanged) {
        valueChanged(
          target.selectedIndex
            ? muscleGroupsSorted[target.selectedIndex - 1]
            : undefined
        );
      }
    },
    [muscleGroupsSorted, valueChanged]
  );
  return (
    <MdOutlinedSelect
      label='Muscle Group'
      hasLeadingIcon
      onChange={changed}
      className={styles.outlinedSelect}
    >
      <MdIcon slot='leading-icon'>exercise</MdIcon>
      <MdSelectOption selected={!value} value={undefined}>
        <div slot='headline'>N/A</div>
      </MdSelectOption>
      {muscleGroupsSorted.map((group) => (
        <MdSelectOption key={group} selected={value === group} value={value}>
          <div slot='headline'>{group.replace('_', ' ')}</div>
        </MdSelectOption>
      ))}
    </MdOutlinedSelect>
  );

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
          <option key={group} value={group}>
            {group.replace('_', ' ')}
          </option>
        ))}
    </select>
  );
}
