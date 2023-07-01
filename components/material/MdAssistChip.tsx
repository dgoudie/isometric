import * as React from 'react';

import { MdAssistChip as _MdAssistChip } from '@material/web/chips/assist-chip';
import { createComponent } from '@lit-labs/react';

export const MdAssistChip = createComponent({
  tagName: 'md-assist-chip',
  elementClass: _MdAssistChip,
  react: React,
});
