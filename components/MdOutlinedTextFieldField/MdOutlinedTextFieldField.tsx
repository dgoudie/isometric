import { FieldHookConfig, useField } from 'formik';

import { MdOutlinedTextField } from '../material/MdOutlinedTextField';
import { MdOutlinedTextField as _MdOutlinedTextField } from '@material/web/textfield/outlined-text-field';
import { useCallback } from 'react';

export default function MdFilledTextFieldField(props: FieldHookConfig<string>) {
  const [_field, meta, helpers] = useField<string>(props);
  const { value, error } = meta;
  const { setValue } = helpers;

  const { autoFocus, id, name, disabled } = props;

  const onInput = useCallback(
    (event: Event) => {
      const target = event.target as _MdOutlinedTextField;
      setValue(target.value);
    },
    [setValue]
  );

  return (
    <MdOutlinedTextField
      error={!!error}
      errorText={error}
      value={value}
      onInput={onInput}
      id={props.id}
      name={props.name}
      autofocus={props.autoFocus}
      disabled={props.disabled}
      label={props['aria-label']}
      aria-label={props['aria-label']}
    ></MdOutlinedTextField>
  );
}
