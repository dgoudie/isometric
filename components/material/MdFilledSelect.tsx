import * as React from 'react';

import { MdFilledSelect as _MdFilledSelect } from '@material/web/select/filled-select';
import { createComponent } from '@lit-labs/react';

export const MdFilledSelect = createComponent({
  tagName: 'md-filled-select',
  elementClass: _MdFilledSelect,
  react: React,
  events: {
    onchange: 'change',
  },
});
