import { signOut } from 'next-auth/react';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

const useFetchWith403Redirect = () => {
  const router = useRouter();

  const fetcher = useCallback(
    (...args: Parameters<typeof fetch>) =>
      fetch(...args).then((res) => {
        if (res.status === 403) {
          router.replace('/?reason=loggedoff');
        } else {
          return res.json();
        }
      }),
    [router]
  );

  return fetcher;
};

export default useFetchWith403Redirect;
