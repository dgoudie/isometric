import GoogleOneTapProvider from './google-one-tap-provider';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { initializeUserDataIfNecessary } from '../database/initialize-user';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
    GoogleOneTapProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      let verified = false;
      if (account.provider === 'google') {
        verified = profile.email_verified as boolean;
      }
      if (verified) {
        await initializeUserDataIfNecessary(user.email!);
      }
      return verified;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export default nextAuthOptions;
