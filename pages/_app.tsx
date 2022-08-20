// pages/_app.tsx

import '../styles/globals.scss';

import type { ReactElement, ReactNode } from 'react';

import AfterExerciseTimerProvider from '../providers/AfterExerciseTimer/AfterExerciseTimer';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { PusherProvider } from '@harelpls/use-pusher';
import SnackbarProvider from '../providers/Snackbar/Snackbar';
import WorkoutProvider from '../providers/Workout/Workout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const config = {
    // required config props
    clientKey: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    triggerEndpoint: '/api/pusher/trigger',
    authEndpoint: '/api/pusher/auth',
  };
  return getLayout(
    <PusherProvider {...config}>
      <SnackbarProvider>
        <WorkoutProvider>
          <AfterExerciseTimerProvider>
            <Component {...pageProps} />
          </AfterExerciseTimerProvider>
        </WorkoutProvider>
      </SnackbarProvider>
    </PusherProvider>
  );
}
