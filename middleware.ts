import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokeneExpired } from "./utils/token-expired";
import { jwtDecode } from "jwt-decode";
import { clientBaseUrl } from "./utils/axios";
import { isAuth } from "./utils/authenticated";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("refresh_token");
  const token2 = req.headers.get("Authorization")?.split(" ")[1];
  console.log("middleware");
  console.log(token);
  console.log(token2);
  if (!token) {
    return NextResponse.redirect(clientBaseUrl);
  }

  try {
    const decodedToken = jwtDecode(token.value);
    console.log(decodedToken);

    if (isTokeneExpired(decodedToken)) {
      return NextResponse.redirect(clientBaseUrl);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(clientBaseUrl);
  }

  // if (
  //   token &&
  //   (req.nextUrl.pathname.startsWith("/") ||
  //     req.nextUrl.pathname.startsWith("/register"))
  // ) {
  //   return NextResponse.redirect(new URL("/rooms", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/rooms/:path*"],
};
