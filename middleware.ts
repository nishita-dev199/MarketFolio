import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

// Simple in-memory rate limiting map
// Note: This is per-instance. For multi-instance deployments, consider Redis (Upstash).
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();

const RATE_LIMIT_THRESHOLD = 10; // 10 requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

export function middleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous';
  const { pathname } = request.nextUrl;

  // Only apply rate limiting to sensitive API routes
  if (pathname.startsWith('/api/contact') || pathname.startsWith('/api/auth/signin')) {
    const now = Date.now();
    const rateLimitInfo = rateLimitMap.get(ip) || { count: 0, lastRequest: now };

    if (now - rateLimitInfo.lastRequest > RATE_LIMIT_WINDOW) {
      rateLimitInfo.count = 1;
      rateLimitInfo.lastRequest = now;
    } else {
      rateLimitInfo.count++;
    }

    rateLimitMap.set(ip, rateLimitInfo);

    if (rateLimitInfo.count > RATE_LIMIT_THRESHOLD) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/contact', '/api/auth/signin'],
};
