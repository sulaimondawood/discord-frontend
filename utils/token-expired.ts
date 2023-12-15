export function isTokeneExpired(decodedToken: any) {
  const expiryDate = decodedToken.exp * 1000;
  return Date.now() > expiryDate;
}
export function TokeneExpired(decodedToken: any) {
  const expiryDate = decodedToken.exp;
  return expiryDate;
}
