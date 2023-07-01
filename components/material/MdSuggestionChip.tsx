import * as React from 'react';

import { MdSuggestionChip as _MdSuggestionChip } from '@material/web/chips/suggestion-chip';
import { createComponent } from '@lit-labs/react';

export const MdSuggestionChip = createComponent({
  tagName: 'md-suggestion-chip',
  elementClass: _MdSuggestionChip,
  react: React,
});
