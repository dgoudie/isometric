const themes = new Map([
  ['default', { light: '#bdcadb', dark: '#091024', displayName: 'Default' }],
  ['edge', { light: '#CCCCCC', dark: '#14171A', displayName: 'Edge' }],
  ['lime', { light: '#c2d6cc', dark: '#0b0d0e', displayName: 'Lime' }],
  [
    'solarized',
    {
      light: 'hsl(44, 20%, 80%)',
      dark: 'hsl(197, 58%, 13%)',
      displayName: 'Solarized',
    },
  ],
  [
    'cool',
    {
      light: 'rgb(223,251,252)',
      dark: 'rgb(27,36,40)',
      displayName: 'Cool',
    },
  ],
]);

export default themes;
