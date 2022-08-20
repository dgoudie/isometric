import { useMemo } from 'react';

const path = `/api/workout/ws`;

export function useWebsocketUrl() {
  return useMemo(() => {
    if (typeof location === 'undefined') {
      return '';
    }
    if (location.hostname === 'localhost') {
      return `ws://${location.host}${path}`;
    }
    return `wss://${location.host}${path}`;
  }, []);
}
