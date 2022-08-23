// pages/_app.tsx

import '../styles/globals.scss';

import type { ReactElement, ReactNode } from 'react';

import AfterExerciseTimerProvider from '../providers/AfterExerciseTimer/AfterExerciseTimer';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import { PusherProvider } from '@harelpls/use-pusher';
import { SessionProvider } from 'next-auth/react';
import SnackbarProvider from '../providers/Snackbar/Snackbar';
import WorkoutProvider from '../providers/Workout/Workout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const config = {
    // required config props
    clientKey: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    triggerEndpoint: '/api/pusher/trigger',
    authEndpoint: '/api/pusher/auth',
  };
  const pageWithLayout = getLayout(<Component {...pageProps} />);
  return (
    <SessionProvider session={session}>
      <PusherProvider {...config}>
        <SnackbarProvider>
          <WorkoutProvider>
            <AfterExerciseTimerProvider>
              <PageWrapper>{pageWithLayout}</PageWrapper>
            </AfterExerciseTimerProvider>
          </WorkoutProvider>
        </SnackbarProvider>
      </PusherProvider>
    </SessionProvider>
  );
}
