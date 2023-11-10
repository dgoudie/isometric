import * as React from 'react';

import { MdFilledTonalButton as _MdFilledTonalButton } from '@material/web/button/filled-tonal-button';
import { createComponent } from '@lit-labs/react';

export const MdFilledTonalButton = createComponent({
  tagName: 'md-filled-tonal-button',
  elementClass: _MdFilledTonalButton,
  react: React,
  events: {
    onclick: 'click',
  },
});
