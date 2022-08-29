import {
  PusherProvider,
  PusherProviderProps,
  usePusher,
} from '@harelpls/use-pusher';
import React, { useEffect } from 'react';

import { useSWRConfig } from 'swr';

export default function PusherProviderWithConfig({
  children,
}: React.PropsWithChildren<{}>) {
  const config: PusherProviderProps = {
    // required config props
    clientKey: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    userAuthentication: {
      transport: 'ajax',
      endpoint: '/api/pusher/auth',
    },
  };
  return (
    <PusherProvider {...config}>
      <PusherApiMutateHandler />
      {children}
    </PusherProvider>
  );
}

function PusherApiMutateHandler() {
  const { client } = usePusher();
  const { mutate } = useSWRConfig();
  useEffect(() => {
    let bind: any;
    if (!!client) {
      bind = client?.user.bind('mutate_api', (data: { apis: string[] }) => {
        console.debug(`Received request to mutate APIs: ${data.apis}`);
        data.apis.forEach((api) => mutate(api));
      });
    }
    return () => {
      bind?.unbind();
    };
  }, [client, mutate]);
  return null;
}
