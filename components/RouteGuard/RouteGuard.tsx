import { PropsWithChildren, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function RouteGuard({ children }: PropsWithChildren<{}>) {
  const router = useRouter();
  const session = useSession();

  const loggedIn = useMemo(
    () => session.status !== 'unauthenticated',
    [session]
  );

  useEffect(() => {
    if (!loggedIn) {
      router.replace('/?reason=loggedoff');
    }
  }, [loggedIn, router]);

  return <>{children}</>;
}
