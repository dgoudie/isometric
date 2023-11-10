import * as React from 'react';

import { MdOutlinedSelect as _MdOutlinedSelect } from '@material/web/select/outlined-select';
import { createComponent } from '@lit-labs/react';

export const MdOutlinedSelect = createComponent({
  tagName: 'md-outlined-select',
  elementClass: _MdOutlinedSelect,
  react: React,
  events: {
    onChange: 'change',
  },
});
