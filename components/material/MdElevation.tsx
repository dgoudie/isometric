import * as React from 'react';

import { MdElevation as _MdElevation } from '@material/web/elevation/elevation';
import { createComponent } from '@lit-labs/react';

export const MdElevation = createComponent({
  tagName: 'md-elevation',
  elementClass: _MdElevation,
  react: React,
});
