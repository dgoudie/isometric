import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';

import { Setting } from '@prisma/client';
import useSWR from 'swr';
import RouteGuard from '../components/RouteGuard/RouteGuard';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import AppBarWithAppHeaderLayout from '../layouts/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import { useFetchJSON } from '../utils/fetch-json';
import themes from '../utils/themes';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import styles from './Settings.module.scss';
import { NextPageWithLayout } from './_app';
import classNames from 'classnames';

const themeLocalStorageKey = `isometric.theme_name`;

const Settings: NextPageWithLayout = ({}) => {
  const fetcher = useFetchJSON();

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
        <DarkModeSetting current={settingsMap.get('dark_mode')} />
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
    <div className={classNames(styles.setting, 'fade-in')}>
      <div className={styles.settingNameAndChildren}>
        <div>{name}</div>
        <div>{children}</div>
      </div>
      <div className={styles.settingDescription}>{description}</div>
    </div>
  );
}

function ThemeSetting({ current }: { current: string }) {
  const [themeName, setThemeName] = useState(current);

  useEffect(() => {
    setThemeName(current);
  }, [current]);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    //@ts-ignore - defined in public/scripts/apply_theme.js
    applyTheme(themeName);
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

function DarkModeSetting({ current }: { current: string }) {
  const [darkMode, setDarkMode] = useState(current);

  useEffect(() => {
    setDarkMode(current);
  }, [current]);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    //@ts-ignore - defined in public/scripts/apply_theme.js
    applyDarkMode(darkMode);
    fetch(`/api/settings/dark_mode`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ key: 'dark_mode', value: darkMode }),
    });
  }, [darkMode]);

  return (
    <Setting
      name='Dark Mode'
      description='Manually enable or disable dark mode. Uses your system setting by default.'
    >
      <div className={styles.selectWrapper}>
        <div className={styles.icon}>
          <i className='fa-solid fa-chevron-down'></i>
        </div>
        <select value={darkMode} onChange={(e) => setDarkMode(e.target.value)}>
          <option value='system'>System</option>
          <option value='light'>Light</option>
          <option value='dark'>Dark</option>
        </select>
      </div>
    </Setting>
  );
}
