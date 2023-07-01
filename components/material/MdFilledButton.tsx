import * as React from 'react';

import { MdFilledButton as _MdFilledButton } from '@material/web/button/filled-button';
import { createComponent } from '@lit-labs/react';

export const MdFilledButton = createComponent({
  tagName: 'md-filled-button',
  elementClass: _MdFilledButton,
  react: React,
  events: {
    onclick: 'click',
  },
});
