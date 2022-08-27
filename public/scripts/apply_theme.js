const defaultThemeName = 'default';
const localStorageKey = `isometric.theme_name`;

const applyTheme = (themeName) => {
  if (!themeName || !window.isometric.themes.has(themeName)) {
    themeName = defaultThemeName;
  }
  localStorage.setItem(localStorageKey, themeName);
  const theme = window.isometric.themes.get(themeName);
  document.body.classList.value = themeName;
  document.head.querySelector(
    '[name="theme-color"][media="(prefers-color-scheme: light)"]'
  ).content = theme.light;
  document.head.querySelector(
    '[name="theme-color"][media="(prefers-color-scheme: dark)"]'
  ).content = theme.dark;
};

applyTheme(localStorage.getItem(localStorageKey));

const updateThemeFromApi = async () => {
  const themeFromApi = await fetch(`/api/settings/theme`).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 403) {
      return null;
    }
    {
      throw res;
    }
  });
  !!themeFromApi && applyTheme(themeFromApi.value);
};

updateThemeFromApi();
