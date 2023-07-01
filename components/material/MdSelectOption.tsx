import * as React from 'react';

import { MdSelectOption as _MdSelectOption } from '@material/web/select/select-option';
import { createComponent } from '@lit-labs/react';

export const MdSelectOption = createComponent({
  tagName: 'md-select-option',
  elementClass: _MdSelectOption,
  react: React,
});
