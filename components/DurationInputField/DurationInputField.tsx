import { FieldHookConfig, useField } from 'formik';
import React, { useCallback, useEffect, useRef } from 'react';

import { inputForceInteger } from '../../utils/input-force-integer';
import styles from './DurationInputField.module.scss';

export default function DurationInputField({
  className,
  ...props
}: FieldHookConfig<number | undefined> & {
  className?: string;
}) {
  const [_field, meta, helpers] = useField<number | undefined>(props);
  const { value } = meta;
  const { setValue } = helpers;

  const minsInputRef = useRef<HTMLInputElement>(null);
  const secondsInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mins = 0;
    let seconds = 0;
    if (typeof value !== 'undefined' && value > 0) {
      mins = Math.floor(value / 60);
      seconds = value % 60;
    }
    !!minsInputRef.current && (minsInputRef.current.value = mins.toString());
    !!secondsInputRef.current &&
      (secondsInputRef.current.value = seconds.toString());
  }, [value]);

  const onChange = useCallback(() => {
    let mins = minsInputRef.current!.valueAsNumber;
    let seconds = secondsInputRef.current!.valueAsNumber;
    if (isNaN(mins)) mins = 0;
    if (isNaN(seconds)) seconds = 0;
    setValue(mins * 60 + seconds);
  }, [setValue]);

  return (
    <div className={styles.root}>
      <input
        className='standard-form-input'
        type='number'
        inputMode='decimal'
        disabled={props.disabled}
        ref={minsInputRef}
        onBlur={onChange}
        onInput={inputForceInteger}
      />
      mins
      <input
        className='standard-form-input'
        type='number'
        inputMode='decimal'
        disabled={props.disabled}
        ref={secondsInputRef}
        onBlur={onChange}
        onInput={inputForceInteger}
      />
      seconds
    </div>
  );
}
