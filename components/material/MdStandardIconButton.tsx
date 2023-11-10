import * as React from 'react';

import { MdFilledButton as _MdFilledButton } from '@material/web/button/filled-button';
import { MdIconButton as _MdIconButton } from '@material/web/iconbutton/icon-button';
import { createComponent } from '@lit-labs/react';

export const MdIconButton = createComponent({
  tagName: 'md-icon-button',
  elementClass: _MdIconButton,
  react: React,
  events: {
    onclick: 'click',
  },
});
