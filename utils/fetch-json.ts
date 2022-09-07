import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const useFetchJSON = <T = any>() => {
  const fetcher = useCallback(
    (...args: Parameters<typeof fetch>) =>
      fetch(...args).then((res) => {
        if (res.ok) {
          return res.json() as Promise<T>;
        } else {
          throw res;
        }
      }),
    []
  );

  return fetcher;
};
