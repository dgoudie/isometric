import AppHeader from '../components/AppHeader/AppHeader';
import { NextPageWithLayout } from './_app';
import RouteLoader from '../components/RouteLoader/RouteLoader';
import { useEffect } from 'react';
import { useFetchJSON } from '../utils/fetch-json';
import { useHeadWithTitle } from '../utils/use-head-with-title';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Setup: NextPageWithLayout = () => {
  const router = useRouter();

  const session = useSession();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace('/');
    } else if (session.status === 'authenticated') {
      if (session?.data?.isInitialized) {
        router.replace('/');
      } else if (session?.data && !session.data.isInitialized) {
        fetch(`/api/user/setup`).then(() => window.location.reload());
      }
    }
  }, [router, session]);

  const head = useHeadWithTitle('Please Wait...');

  return (
    <>
      {head}
      <RouteLoader text='Setting Up Your Account. Please Wait' />
    </>
  );
};

Setup.getLayout = (page) => (
  <>
    <AppHeader />
    {page}
  </>
);

export default Setup;
