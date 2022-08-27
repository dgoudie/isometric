import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';

import { Setting } from '@prisma/client';
import useSWR from 'swr';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import useFetchWith403Redirect from '../utils/fetch-with-403-redirect';
import themes from '../utils/themes';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import styles from './Settings.module.scss';
import { NextPageWithLayout } from './_app';

const themeLocalStorageKey = `isometric.theme_name`;

const format = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const Settings: NextPageWithLayout = ({}) => {
  const fetcher = useFetchWith403Redirect();

  const { data, error } = useSWR<Setting[]>('/api/settings', fetcher);

  const settingsMap = useMemo(
    () =>
      //@ts-ignore
      new Map(data?.map((item) => [item.setting!.key, item.setting!.value])),
    [data]
  );

  const head = useHeadWithTitle('Settings');

  if (error) throw error;
  if (!data) return <RouteLoader />;

  return (
    <div className={styles.root}>
      {head}
      <h1>User Settings</h1>
      <div className={styles.settings}>
        <ThemeSetting current={settingsMap.get('theme')} />
      </div>
    </div>
  );
};

export default Settings;

Settings.getLayout = (page) => (
  <AppBarWithAppHeaderLayout>
    <RouteGuard>{page}</RouteGuard>
  </AppBarWithAppHeaderLayout>
);

function ThemeSetting({ current }: { current: string }) {
  const [themeName, setThemeName] = useState(current);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    localStorage.setItem(themeLocalStorageKey, themeName);
    const theme = themes.get(themeName)!;
    document.body.classList.value = themeName;
    document.head.querySelector<HTMLMetaElement>(
      '[name="theme-color"][media="(prefers-color-scheme: light)"]'
    )!.content = theme.light;
    document.head.querySelector<HTMLMetaElement>(
      '[name="theme-color"][media="(prefers-color-scheme: dark)"]'
    )!.content = theme.dark;
    fetch(`/api/settings/theme`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ key: 'theme', value: themeName }),
    });
  }, [themeName]);

  return (
    <Setting
      name='Theme'
      description='Select an app theme. Each theme has its own light and dark modes.'
    >
      <div className={styles.selectWrapper}>
        <div className={styles.icon}>
          <i className='fa-solid fa-chevron-down'></i>
        </div>
        <select
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
        >
          {Array.from(themes.entries()).map(([name, { displayName }]) => (
            <option key={name} value={name}>
              {displayName}
            </option>
          ))}
        </select>
      </div>
    </Setting>
  );
}

interface SettingProps {
  name: string;
  description: string;
}

function Setting({
  name,
  description,
  children,
}: PropsWithChildren<SettingProps>) {
  return (
    <div className={styles.setting}>
      <div className={styles.settingNameAndChildren}>
        <div>{name}</div>
        <div>{children}</div>
      </div>
      <div className={styles.settingDescription}>{description}</div>
    </div>
  );
}
