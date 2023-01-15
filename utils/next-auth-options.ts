import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

import { AuthOptions } from 'next-auth';
import GoogleOneTapProvider from './google-one-tap-provider';
import hashEmail from './hash-email';
import prisma from '../database/prisma';

const nextAuthOptions: AuthOptions = {
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
    async signIn({ account, profile }) {
      let verified = true;
      if (account?.provider === 'google' && !!profile) {
        verified = (profile as GoogleProfile).email_verified as boolean;
      }
      return verified;
    },
    async session({ session }) {
      const userInDatabase = await prisma.user.findFirst({
        where: { email: hashEmail(session.user!.email!) },
      });
      session.isInitialized = !!userInDatabase;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export default nextAuthOptions;
