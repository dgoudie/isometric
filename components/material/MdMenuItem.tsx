import * as React from 'react';

import { MdMenuItem as _MdMenuItem } from '@material/web/menu/menu-item';
import { createComponent } from '@lit-labs/react';

export const MdMenuItem = createComponent({
  tagName: 'md-menu-item',
  elementClass: _MdMenuItem,
  react: React,
  events: {
    onclick: 'click',
  },
});
