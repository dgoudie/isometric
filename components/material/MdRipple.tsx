import * as React from 'react';

import { MdRipple as _MdRipple } from '@material/web/ripple/ripple';
import { createComponent } from '@lit-labs/react';

export const MdRipple = createComponent({
  tagName: 'md-ripple',
  elementClass: _MdRipple,
  react: React,
});
