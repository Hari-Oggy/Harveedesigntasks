import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Middleware — runs on the Edge before pages are rendered.
 *
 * Rules:
 * - /dashboard/* routes: require admin_token cookie → else redirect to /login
 * - /login: if already has admin_token → redirect to /dashboard
 * - /student/dashboard: require student_token cookie → else redirect to /student
 * - /student (login page): if already has student_token → let through (guard handles it)
 * - Everything else: allow through
 *
 * NOTE: We use cookies not localStorage (middleware runs on the server/edge).
 * The frontend stores tokens in localStorage AND we sync them to cookies on login.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /dashboard and all sub-routes
  if (pathname.startsWith("/dashboard")) {
    const adminToken = request.cookies.get("admin_token")?.value;
    if (!adminToken) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // If already logged in as admin and visiting /login → skip to dashboard
  if (pathname === "/login") {
    const adminToken = request.cookies.get("admin_token")?.value;
    if (adminToken) {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on these paths (not on static files, API routes, etc.)
  matcher: ["/dashboard/:path*", "/login"],
};
