// pages/_app.tsx

import '../styles/globals.scss';

import { PusherProvider, usePusher } from '@harelpls/use-pusher';
import type { ReactElement, ReactNode } from 'react';

import AfterExerciseTimerProvider from '../providers/AfterExerciseTimer/AfterExerciseTimer';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import PusherProviderWithConfig from '../providers/Pusher/Pusher';
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
  const pageWithLayout = getLayout(<Component {...pageProps} />);
  return (
    <SessionProvider session={session}>
      <PusherProviderWithConfig>
        <SnackbarProvider>
          <WorkoutProvider>
            <AfterExerciseTimerProvider>
              <PageWrapper>{pageWithLayout}</PageWrapper>
            </AfterExerciseTimerProvider>
          </WorkoutProvider>
        </SnackbarProvider>
      </PusherProviderWithConfig>
    </SessionProvider>
  );
}
