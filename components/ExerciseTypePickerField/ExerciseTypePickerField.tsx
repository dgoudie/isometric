import { FieldHookConfig, useField } from 'formik';

import { ExerciseType } from '@prisma/client';
import ExerciseTypePicker from '../ExerciseTypePicker/ExerciseTypePicker';

export default function ExerciseTypePickerField(
  props: FieldHookConfig<ExerciseType>
) {
  const [_field, meta, helpers] = useField<ExerciseType>(props);
  const { value } = meta;
  const { setValue } = helpers;
  return (
    <ExerciseTypePicker
      value={value}
      valueChanged={setValue}
      disabled={props.disabled}
    />
  );
}
