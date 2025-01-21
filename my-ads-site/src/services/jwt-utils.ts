import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  id: string;
  email: string;
  roles: string[];
  name: string;
  address: string;
  zipcode: string;
  exp: number;
  iat: number;
}

export function getUserIdFromToken(token: string): string | null {
  try {
    const decoded: TokenPayload = jwtDecode(token);
    return decoded.id || null;
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
}
