import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const useFetchJSONWith403Redirect = <T = any>() => {
  const router = useRouter();

  const fetcher = useCallback(
    (...args: Parameters<typeof fetch>) =>
      fetch(...args).then((res) => {
        if (res.status === 403) {
          router.replace('/');
        } else if (res.status >= 200 && res.status < 300) {
          return res.json() as Promise<T>;
        } else {
          throw res;
        }
      }),
    [router]
  );

  return fetcher;
};
