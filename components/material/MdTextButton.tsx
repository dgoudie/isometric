import * as React from 'react';

import { MdTextButton as _MdTextButton } from '@material/web/button/text-button';
import { createComponent } from '@lit-labs/react';

export const MdTextButton = createComponent({
  tagName: 'md-text-button',
  elementClass: _MdTextButton,
  react: React,
  events: {
    onclick: 'click',
  },
});
