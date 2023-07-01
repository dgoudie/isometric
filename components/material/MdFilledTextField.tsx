import * as React from 'react';

import { MdFilledTextField as _MdFilledTextField } from '@material/web/textfield/filled-text-field';
import { createComponent } from '@lit-labs/react';

export const MdFilledTextField = createComponent({
  tagName: 'md-filled-text-field',
  elementClass: _MdFilledTextField,
  react: React,
  events: {
    onchange: 'change',
  },
});
