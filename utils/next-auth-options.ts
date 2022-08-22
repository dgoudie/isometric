import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        return profile.email_verified as boolean;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
};

export default nextAuthOptions;
