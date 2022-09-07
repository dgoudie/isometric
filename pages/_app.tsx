// pages/_app.tsx

import '../styles/globals.scss';

import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';

import AfterExerciseTimerProvider from '../providers/AfterExerciseTimer/AfterExerciseTimer';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import PusherProviderWithConfig from '../providers/Pusher/Pusher';
import SnackbarProvider from '../providers/Snackbar/Snackbar';
import WorkoutProvider from '../providers/Workout/Workout';
import useBuildId from '../utils/use-build-id';
import { useRouter } from 'next/router';

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
  const buildId = useBuildId(); // useSWR under the hood
  const prevBuildId = useRef<string | undefined>(buildId);
  const router = useRouter();
  useEffect(() => {
    if (prevBuildId.current && buildId && prevBuildId.current !== buildId) {
      router.reload();
    }
    prevBuildId.current = buildId;
  }, [buildId, router]);

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
