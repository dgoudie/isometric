const defaultThemeName = 'default';
const defaultDarkMode = 'system';
const localStorageKeyThemeName = `isometric.theme_name`;
const localStorageKeyDarkMode = `isometric.dark_mode`;

applyClasses = () => {
  const mode = localStorage.getItem(localStorageKeyDarkMode);
  const themeName = localStorage.getItem(localStorageKeyThemeName);
  const theme = window.isometric.themes.get(themeName);
  if (mode === 'system') {
    document.body.classList.value = themeName;
    document.head.querySelector(
      '[name="theme-color"][media="(prefers-color-scheme: light)"]'
    ).content = theme.light;
    document.head.querySelector(
      '[name="theme-color"][media="(prefers-color-scheme: dark)"]'
    ).content = theme.dark;
    document.head.querySelector('[name="theme-color"]:not([media])').content =
      null;
  } else {
    document.body.classList.value = `${themeName} ${mode}`;
    document.head.querySelector(
      '[name="theme-color"][media="(prefers-color-scheme: light)"]'
    ).content = null;
    document.head.querySelector(
      '[name="theme-color"][media="(prefers-color-scheme: dark)"]'
    ).content = null;
    document.head.querySelector('[name="theme-color"]:not([media])').content =
      mode === 'light' ? theme.light : theme.dark;
  }
};

const applyTheme = (themeName) => {
  if (!themeName || !window.isometric.themes.has(themeName)) {
    themeName = defaultThemeName;
  }
  localStorage.setItem(localStorageKeyThemeName, themeName);
  applyClasses();
};

const applyDarkMode = (mode) => {
  if (!['system', 'dark', 'light'].includes(mode)) {
    mode = defaultDarkMode;
  }
  localStorage.setItem(localStorageKeyDarkMode, mode);
  applyClasses();
};

applyTheme(localStorage.getItem(localStorageKeyThemeName));
applyDarkMode(localStorage.getItem(localStorageKeyDarkMode));

const updateThemeFromApi = async () => {
  const response = await fetch(`/api/settings`).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 403) {
      return null;
    }
    {
      throw res;
    }
  });
  if (response) {
    const settingsMapped = new Map(
      response.map((setting) => [setting.key, setting])
    );
    applyTheme(settingsMapped.get('theme').setting.value);
    applyDarkMode(settingsMapped.get('dark_mode').setting.value);
  }
};

updateThemeFromApi();
