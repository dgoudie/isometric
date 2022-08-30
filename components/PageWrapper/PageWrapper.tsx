import React, { useCallback, useEffect } from 'react';

import styles from './PageWrapper.module.scss';
import { useFetchJSONWith403Redirect } from '../../utils/fetch-with-403-redirect';
import { usePageVisibility } from 'react-page-visibility';
import { usePusher } from '@harelpls/use-pusher';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

export default function PageWrapper({ children }: React.PropsWithChildren<{}>) {
  const pageVisible = usePageVisibility();
  const { client } = usePusher();
  client?.signin();

  useEffect(() => {
    if (pageVisible) {
      console.debug(`Connecting to Pusher`);
      client?.connect();
    } else {
      console.debug(`Disconnecting from Pusher`);
      client?.disconnect();
    }
  }, [client, pageVisible]);

  const fetcher = useFetchJSONWith403Redirect<{
    userHasActiveWorkout: boolean;
  }>();

  const session = useSession();

  const { data } = useSWR(
    session.status === 'authenticated' ? `/api/workout/exists` : null,
    fetcher
  );

  const router = useRouter();

  useEffect(() => {
    if (typeof data !== 'undefined' && router.isReady) {
      if (data.userHasActiveWorkout && router.pathname !== '/workout') {
        router.replace('/workout');
      } else if (!data.userHasActiveWorkout && router.pathname === '/workout') {
        router.replace('/dashboard');
      }
    }
  }, [data, router, session]);

  return <div className={styles.pageWrapper}>{children}</div>;
}
