import * as React from 'react';

import { MdCircularProgress as _MdCircularProgress } from '@material/web/progress/circular-progress';
import { createComponent } from '@lit-labs/react';

export const MdCircularProgress = createComponent({
  tagName: 'md-circular-progress',
  elementClass: _MdCircularProgress,
  react: React,
});
