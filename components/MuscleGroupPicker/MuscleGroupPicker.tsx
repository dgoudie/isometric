import { ExerciseMuscleGroup } from '@prisma/client';
import { MdFilledSelect } from '../material/MdFilledSelect';
import { MdIcon } from '../material/MdIcon';
import { MdSelectOption } from '../material/MdSelectOption';
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
    <MdFilledSelect
      label='Muscle Group'
      hasLeadingIcon
      // onChange={(e) =>
      //   valueChanged &&
      //   //@ts-ignore
      //   valueChanged((e.target.value as ExerciseMuscleGroup) ?? undefined)
      // }
      onChange={console.log}
    >
      <MdIcon slot='leadingicon' data-role='icon'>
        exercise
      </MdIcon>
      <MdSelectOption headline='N/A' selected={!value} value={undefined} />
      {Object.keys(ExerciseMuscleGroup)
        .sort()
        .map((group) => (
          <MdSelectOption
            key={group}
            headline={group.replace('_', ' ')}
            selected={value === group}
            value={value}
          />
        ))}
    </MdFilledSelect>
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
