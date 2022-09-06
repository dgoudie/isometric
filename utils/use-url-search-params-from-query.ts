import { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';

export default function useUrlSearchParamsFromQuery(query: ParsedUrlQuery) {
  const urlSearchParams = useMemo(() => {
    const urlSearchParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (typeof value !== 'undefined') {
        if (Array.isArray(value)) {
          value.forEach((val) => urlSearchParams.append(key, val));
        } else {
          urlSearchParams.append(key, value);
        }
      }
    });
    return urlSearchParams;
  }, [query]);
  return urlSearchParams;
}
