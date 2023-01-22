import { createContext, useEffect, useState } from 'react';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { parseCookies, setCookie } from 'nookies';

import userService from '../services/user-service';
import Router from 'next/router';

type AuthContextTypes = {
  isAuthenticated: boolean;
  signIn: (data: LoginProps) => Promise<void>;
  user: User;
};
type LoginProps = {
  email: string;
  password: string;
};
type User = {
  name: string;
  email: string;
  id: string;
  photo: string;
};
type Payload = JwtPayload & {
  name: string;
  email: string;
  id: string;
  photo: string;
};
export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { monorepo_auth_token: token } = parseCookies();
    if (token) {
      const decoded: Payload = jwt_decode(token); 

      const findUser = async () => {
        const { data } = await userService.findById(decoded.sub);
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          photo: data.photo,
        });
      };
      findUser();
    }
  }, []);

  async function signIn({ email, password }: LoginProps) {
    const { token } = await userService.login({ email, password });

    const decoded: Payload = jwt_decode(token);

    setUser({
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      photo: decoded.photo,
    });

    setCookie(undefined, 'monorepo_auth_token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    Router.push('/dogs');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
