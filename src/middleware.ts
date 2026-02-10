// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware für Domain-Redirects
 * 
 * Hauptzweck: www.alexander-ergart.de → alexander-ergart.de
 * Verhindert Duplicate Content auf Domain-Ebene für SEO
 */
export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    // Redirect www to non-www (permanenter 301 Redirect)
    if (url.hostname.startsWith('www.')) {
        url.hostname = url.hostname.replace('www.', '');
        return NextResponse.redirect(url, { status: 301, statusText: 'Moved Permanently' });
    }

    // Für alle anderen Anfragen: weiterleiten
    return NextResponse.next();
}

/**
 * Matcher: Auf welche Pfade soll die Middleware angewendet werden?
 * 
 * - Alle Pfade /:path*
 * - ABER: Nicht auf Next.js interne Pfade (_next, api) und statische Assets
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, robots.txt, sitemap.xml (static files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
    ],
};
