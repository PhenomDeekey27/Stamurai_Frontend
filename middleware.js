import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const normalizedPath = pathname.replace(/\/$/, "") || "/";

  // Allow static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const authRoutes = ["/auth/login", "/auth/register", "/auth/signup"];

  if (authRoutes.includes(normalizedPath) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// ✅ This tells Next.js to run middleware only on these routes
export const config = {
  matcher: ["/auth/:path*"], // only run on auth pages
};
