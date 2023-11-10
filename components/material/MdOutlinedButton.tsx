import * as React from 'react';

import { MdOutlinedButton as _MdOutlinedButton } from '@material/web/button/outlined-button';
import { createComponent } from '@lit-labs/react';

export const MdOutlinedButton = createComponent({
  tagName: 'md-outlined-button',
  elementClass: _MdOutlinedButton,
  react: React,
  events: {
    onclick: 'click',
  },
});
