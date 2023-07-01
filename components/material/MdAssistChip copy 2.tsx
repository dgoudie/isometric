import * as React from 'react';

import { MdFilterChip as _MdFilterChip } from '@material/web/chips/filter-chip';
import { createComponent } from '@lit-labs/react';

export const MdFilterChip = createComponent({
  tagName: 'md-filter-chip',
  elementClass: _MdFilterChip,
  react: React,
  events: {
    onSelected: 'selected',
  },
});
