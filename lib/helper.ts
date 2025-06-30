import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (e) {
    return true;
  }
}
