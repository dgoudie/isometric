import * as React from 'react';

import { MdOutlinedTextField as _MdOutlinedTextField } from '@material/web/textfield/outlined-text-field';
import { createComponent } from '@lit-labs/react';

export const MdOutlinedTextField = createComponent({
  tagName: 'md-outlined-text-field',
  elementClass: _MdOutlinedTextField,
  react: React,
  events: {
    onChange: 'change',
    onInput: 'input',
  },
});
