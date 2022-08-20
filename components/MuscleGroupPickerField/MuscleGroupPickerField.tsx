import { FieldHookConfig, useField } from 'formik';
import SetCountPicker, { SetCount } from '../SetCountPicker/SetCountPicker';

import { ExerciseMuscleGroup } from '@dgoudie/isometric-types';
import MuscleGroupPicker from '../MuscleGroupPicker/MuscleGroupPicker';
import React from 'react';

export default function MuscleGroupPickerField({
  className,
  ...props
}: FieldHookConfig<ExerciseMuscleGroup | undefined> & {
  className?: string;
}) {
  const [_field, meta, helpers] = useField<ExerciseMuscleGroup | undefined>(
    props
  );
  const { value } = meta;
  const { setValue } = helpers;
  return (
    <MuscleGroupPicker
      className={className}
      value={value}
      valueChanged={setValue}
      disabled={props.disabled}
      required={props.required}
    />
  );
}
