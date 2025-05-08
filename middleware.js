import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const normalizedPath = pathname.replace(/\/$/, "") || "/";

  console.log("Token:", token);
  console.log("Pathname:", pathname);

  // Allow static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const protectedRoutes = ["/"];
  const authRoutes = ["/auth/login", "/auth/register", "/auth/signup"];

  // Block access to protected pages without token
  if (protectedRoutes.includes(normalizedPath) && !token) {
    console.log("Redirecting to login...");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Block access to login/register if already authenticated
  if (authRoutes.includes(normalizedPath) && token) {
    console.log("Redirecting to home...");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
