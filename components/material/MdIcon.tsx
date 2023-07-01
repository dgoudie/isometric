import * as React from 'react';

import { MdIcon as _MdIcon } from '@material/web/icon/icon';
import { createComponent } from '@lit-labs/react';

export const MdIcon = createComponent({
  tagName: 'md-icon',
  elementClass: _MdIcon,
  react: React,
});
