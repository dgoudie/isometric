import { SignInOptions, signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';

interface OneTapSigninOptions {}

const useOneTapSignin = (
  opt?: OneTapSigninOptions & Pick<SignInOptions, 'redirect' | 'callbackUrl'>
) => {
  const { status } = useSession();
  const notSignedIn = status === 'unauthenticated';
  const googleInitializeCallback = useCallback(
    (response: any) => {
      signIn('googleonetap', {
        credential: response.credential,
        redirect: true,
        ...opt,
      });
    },
    [opt]
  );

  useEffect(() => {
    if (notSignedIn) {
      const { google } = window as any;
      if (google) {
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
          callback: googleInitializeCallback,
          itp_support: true,
        });
        google.accounts.id.prompt();
      }
    }
  }, [googleInitializeCallback, notSignedIn]);
};

export default useOneTapSignin;
