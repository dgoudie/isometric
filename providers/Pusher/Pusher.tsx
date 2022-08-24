import { PusherProvider, PusherProviderProps } from '@harelpls/use-pusher';

import React from 'react';

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
  return <PusherProvider {...config}>{children}</PusherProvider>;
}
