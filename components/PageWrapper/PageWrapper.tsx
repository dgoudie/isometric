import React, { useCallback, useEffect } from 'react';

import styles from './PageWrapper.module.scss';
import { usePageVisibility } from 'react-page-visibility';
import { usePusher } from '@harelpls/use-pusher';

export default function PageWrapper({ children }: React.PropsWithChildren<{}>) {
  const pageVisible = usePageVisibility();
  const { client } = usePusher();
  client?.signin();

  const onSignIn = useCallback(() => {
    fetch(`/api/workout/request_state`);
  }, []);

  useEffect(() => {
    client?.bind('pusher:signin_success', onSignIn);

    return () => {
      client?.unbind('pusher:signin_success', onSignIn);
    };
  }, [client, onSignIn]);

  useEffect(() => {
    if (pageVisible) {
      client?.connect();
    } else {
      client?.disconnect();
    }
  }, [client, pageVisible]);

  return <div className={styles.pageWrapper}>{children}</div>;
}
