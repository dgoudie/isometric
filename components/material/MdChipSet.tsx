import * as React from 'react';

import { MdChipSet as _MdChipSet } from '@material/web/chips/chip-set';
import { createComponent } from '@lit-labs/react';

export const MdChipSet = createComponent({
  tagName: 'md-chip-set',
  elementClass: _MdChipSet,
  react: React,
});
