export { default } from 'next-auth/middleware';

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/workout',
    '/setup',
    '/schedule/:path*',
    '/history',
    '/exercises/:path*',
    '/dashboard',
  ],
};
