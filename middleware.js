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

  const authRoutes = ["/auth/login", "/auth/register", "/auth/signup"];

  // If authenticated and visiting login/register/signup, redirect to home
  if (authRoutes.includes(normalizedPath) && token) {
    console.log("Redirecting to home...");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Don't block access to any other routes (including /)
  return NextResponse.next();
}
