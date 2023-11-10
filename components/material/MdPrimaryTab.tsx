import * as React from 'react';

import { MdPrimaryTab as _MdPrimaryTab } from '@material/web/tabs/primary-tab';
import { createComponent } from '@lit-labs/react';

export const MdPrimaryTab = createComponent({
  tagName: 'md-primary-tab',
  elementClass: _MdPrimaryTab,
  react: React,
});
