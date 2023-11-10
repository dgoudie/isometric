import * as React from 'react';

import { MdFab as _MdFab } from '@material/web/fab/fab.js';
import { createComponent } from '@lit-labs/react';

export const MdFab = createComponent({
  tagName: 'md-fab',
  elementClass: _MdFab,
  react: React,
});
