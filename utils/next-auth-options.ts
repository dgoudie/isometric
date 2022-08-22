import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
  ],
};

export default nextAuthOptions;
