import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokeneExpired } from "./utils/token-expired";
import { jwtDecode } from "jwt-decode";
import { clientBaseUrl } from "./utils/axios";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("refresh_token");
  const decodedToken = token ? jwtDecode(token.value) : null;
  if (!token || isTokeneExpired(decodedToken)) {
    return NextResponse.redirect(clientBaseUrl);
  }

  if (
    (token && req.nextUrl.pathname.startsWith("/register")) ||
    req.nextUrl.pathname.startsWith("/")
  ) {
    // Avoid redirect loop for "/rooms"
    if (!req.nextUrl.pathname.startsWith("/rooms")) {
      return NextResponse.redirect(new URL("/rooms", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/rooms/:path*",
    "/",
    "/register",
    "/friends",
    "/account",
    "/nitro",
  ],
};
