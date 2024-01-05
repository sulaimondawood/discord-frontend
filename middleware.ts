import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokeneExpired } from "./utils/token-expired";
import { jwtDecode } from "jwt-decode";
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const decodedToken = jwtDecode(token.value);
    if (isTokeneExpired(decodedToken)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/rooms/:path*", "/friends", "/account/:path*"],
};
