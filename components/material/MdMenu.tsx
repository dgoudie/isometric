import * as React from 'react';

import { MdMenu as _MdMenu } from '@material/web/menu/menu';
import { createComponent } from '@lit-labs/react';

export const MdMenu = createComponent({
  tagName: 'md-menu',
  elementClass: _MdMenu,
  react: React,
});
