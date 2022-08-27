import { PropsWithChildren, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function RouteGuard({ children }: PropsWithChildren<{}>) {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace('/?reason=loggedoff');
    }
  }, [router, session.status]);

  return <>{children}</>;
}
