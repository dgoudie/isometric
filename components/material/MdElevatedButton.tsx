import * as React from 'react';

import { MdElevatedButton as _MdElevatedButton } from '@material/web/button/elevated-button';
import { createComponent } from '@lit-labs/react';

export const MdElevatedButton = createComponent({
  tagName: 'md-elevated-button',
  elementClass: _MdElevatedButton,
  react: React,
  events: {
    onclick: 'click',
  },
});
