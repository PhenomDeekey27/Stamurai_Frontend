import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  // Redirect logged-in users away from login/register pages
  if (token && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect logged-out users away from protected routes
  if (!token && pathname !== "/auth/login" && pathname !== "/auth/register") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/", "/newTodo"], // Add protected routes
};
