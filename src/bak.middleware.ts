import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define which paths are considered public (accessible without authentication)
    const isPublicPath =
        path === '/login' ||
        path === '/signup' ||
        path === '/' ||
        path === '/item-details';

    // Get the token from the cookies
    const token = request.cookies.get('token')?.value;
    console.log('🚀 ~ middleware ~ token:', token);

    // Redirect logic
    if (isPublicPath && token) {
        // If user is on a public path but has a token, redirect to inventory
        return NextResponse.redirect(new URL('/inventory', request.url));
    }

    if (!isPublicPath && !token) {
        console.log('🚀 ~ middleware ~ token:', token);
        console.log('🚀 ~ middleware ~ isPublicPath:', isPublicPath);
        // If user is on a protected path and doesn't have a token, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
