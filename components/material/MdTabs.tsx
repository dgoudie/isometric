import * as React from 'react';

import { MdTabs as _MdTabs } from '@material/web/tabs/tabs';
import { createComponent } from '@lit-labs/react';

export const MdTabs = createComponent({
  tagName: 'md-tabs',
  elementClass: _MdTabs,
  react: React,
  events: {
    onChange: 'change',
  },
});
