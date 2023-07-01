import * as React from 'react';

import { MdFilledButton as _MdFilledButton } from '@material/web/button/filled-button';
import { MdStandardIconButton as _MdStandardIconButton } from '@material/web/iconbutton/standard-icon-button';
import { createComponent } from '@lit-labs/react';

export const MdStandardIconButton = createComponent({
  tagName: 'md-standard-icon-button',
  elementClass: _MdStandardIconButton,
  react: React,
  events: {
    onclick: 'click',
  },
});
