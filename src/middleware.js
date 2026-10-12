// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const currentPath = request.nextUrl.pathname;
  
  // ⚡ Cookies are used as firewalls here for edge route filtering speed
  const activeSessionCookie = request.cookies.get("prism_session_token")?.value;

  // 1. Block unauthenticated access to client portals
  if (currentPath.startsWith("/client") && !activeSessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Protect Admin Console parameters
  if (currentPath.startsWith("/admin") && !activeSessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Scopes out precisely which router layers this middleware script evaluates
export const config = {
  matcher: ["/client/:path*", "/admin/:path*"],
};
