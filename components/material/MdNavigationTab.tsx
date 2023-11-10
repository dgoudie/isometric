import * as React from 'react';

import { MdNavigationTab as _MdNavigationTab } from '@material/web/labs/navigationtab/navigation-tab.js';
import { createComponent } from '@lit-labs/react';

export const MdNavigationTab = createComponent({
  tagName: 'md-navigation-tab',
  elementClass: _MdNavigationTab,
  react: React,
});
