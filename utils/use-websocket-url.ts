import { useMemo } from 'react';
import { useRouter } from 'next/router';

const path = `/api/workout/ws`;

export function useWebsocketUrl() {
  return useMemo(() => {
    if (typeof location === 'undefined') {
      return undefined;
    }
    if (location.hostname === 'localhost') {
      return `ws://${location.host}${path}`;
    }
    return `wss://${location.host}${path}`;
  }, []);
}
