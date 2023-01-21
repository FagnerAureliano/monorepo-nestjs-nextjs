import { createContext, useState } from 'react';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { parseCookies, setCookie } from 'nookies';

import userService from '../services/user-service';

type AuthContextTypes = {
  isAuthenticated: boolean;
  signIn: (data: LoginProps) => Promise<any>;
};
type LoginProps = {
  email: string;
  password: string;
};
type User = {
  email: string;
  id: string;
  photo: string;
};
type Payload = JwtPayload & {
  email: string;
  id: string;
  photo: string;
};
export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

  async function signIn({ email, password }: LoginProps) {
    const { token } = await userService.login({ email, password });
    const decoded: Payload = jwt_decode(token);

    setUser({
      id: decoded.sub,
      email: decoded.email,
      photo: decoded.photo,
    });

    setCookie(undefined, 'monorepo_auth_token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
