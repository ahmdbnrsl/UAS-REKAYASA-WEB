import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/next_auth';

export async function middleware(request: NextRequest) {
	const session = await auth();

	const { pathname } = request.nextUrl;

	if (pathname === '/') {
		if (session) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		} else {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}

	if (!session && pathname.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (session && pathname === '/login') {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*', '/login', '/'],
};
