export function isAuth() {
  const token = localStorage.getItem("refresh_token");
  console.log("middleware");
  console.log(token);

  return token;
  // if (!token) {
  //   return NextResponse.redirect(clientBaseUrl);
  // }

  // try {
  //   const decodedToken = jwtDecode(token);
  //   console.log(decodedToken);

  //   if (isTokeneExpired(decodedToken)) {
  //     return NextResponse.redirect(clientBaseUrl);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return NextResponse.redirect(clientBaseUrl);
  // }
}
