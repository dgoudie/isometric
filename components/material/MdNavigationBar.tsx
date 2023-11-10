import * as React from 'react';

import { MdNavigationBar as _MdNavigationBar } from '@material/web/labs/navigationbar/navigation-bar.js';
import { createComponent } from '@lit-labs/react';

export const MdNavigationBar = createComponent({
  tagName: 'md-navigation-bar',
  elementClass: _MdNavigationBar,
  react: React,
  events: {
    onChange: 'change',
  },
});
