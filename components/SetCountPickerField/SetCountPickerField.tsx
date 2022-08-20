import { FieldHookConfig, useField } from 'formik';
import SetCountPicker, { SetCount } from '../SetCountPicker/SetCountPicker';

import React from 'react';

export default function SetCountPickerField(props: FieldHookConfig<SetCount>) {
    const [_field, meta, helpers] = useField<SetCount>(props);
    const { value } = meta;
    const { setValue } = helpers;
    return (
        <SetCountPicker
            value={value}
            valueChanged={setValue}
            disabled={props.disabled}
        />
    );
}
