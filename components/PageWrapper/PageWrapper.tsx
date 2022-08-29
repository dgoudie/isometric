import React, { useCallback, useEffect } from 'react';

import styles from './PageWrapper.module.scss';
import { usePageVisibility } from 'react-page-visibility';
import { usePusher } from '@harelpls/use-pusher';

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

  return <div className={styles.pageWrapper}>{children}</div>;
}
