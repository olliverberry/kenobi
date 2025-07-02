import { auth } from '@/auth';
import { NextAuthRequest } from 'next-auth';

export default auth((req: NextAuthRequest) => {
  if (!req.auth && req.nextUrl.pathname !== '/signin') {
    const newUrl = new URL('/signin', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  // Redirect authenticated users from root to dashboard
  if (req.auth && req.nextUrl.pathname === '/') {
    const newUrl = new URL('/dashboard', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  // Note: We're handling the redirect from /signin in the signin page itself
  // to avoid conflicts between server-side redirects
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
