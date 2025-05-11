import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token"); // Check if token exists

  const { pathname } = req.nextUrl;

  if (token && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register"], // Apply middleware to these routes
};
