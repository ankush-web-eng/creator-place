
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
    matcher: ['/', '/signin', '/signup', '/profile/:path*'],
};

export default async function middleware(request: NextRequest) {

    const token = await getToken({ req: request });
    const url = request.nextUrl;

    if (
        token &&
        (url.pathname.startsWith('/signin') ||
            url.pathname.startsWith('/signup'))
    ) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (
        !token && url.pathname.startsWith('/profile')
    ) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}