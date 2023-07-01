import * as React from 'react';

import { MdTonalButton as _MdTonalButton } from '@material/web/button/tonal-button';
import { createComponent } from '@lit-labs/react';

export const MdTonalButton = createComponent({
  tagName: 'md-tonal-button',
  elementClass: _MdTonalButton,
  react: React,
  events: {
    onclick: 'click',
  },
});
