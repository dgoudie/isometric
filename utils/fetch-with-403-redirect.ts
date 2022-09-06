import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const useFetchJSONWith403Redirect = () => {
  const router = useRouter();

  const fetcher = useCallback(
    <T = any>(...args: Parameters<typeof fetch>) =>
      fetch(...args).then((res) => {
        if (res.status === 403) {
          router.replace('/');
        } else if (res.ok) {
          return res.json() as Promise<T>;
        } else {
          throw res;
        }
      }),
    [router]
  );

  return fetcher;
};
