// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { isTokeneExpired } from "./utils/token-expired";
// import { jwtDecode } from "jwt-decode";
// import { clientBaseUrl } from "./utils/axios";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("refresh_token");
//   const decodedToken = token ? jwtDecode(token.value) : null;
//   if (isTokeneExpired(decodedToken) || !token) {
//     return NextResponse.redirect(clientBaseUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/rooms/:path*", "/friends", "/account/:path*"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokeneExpired } from "./utils/token-expired";
import { jwtDecode } from "jwt-decode";
import { clientBaseUrl } from "./utils/axios";
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/rooms/:path*", "/friends", "/account/:path*"],
};
