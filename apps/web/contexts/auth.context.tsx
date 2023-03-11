import { createContext, useEffect, useState } from 'react';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { parseCookies, setCookie } from 'nookies';

import userService from '../services/user-service';
import Router from 'next/router';
import { api } from '../api';

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
    const { monorepo_auth_token } = parseCookies();

    if (monorepo_auth_token) {
      
      const findUser = async () => {
        const decoded: Payload = await jwt_decode(monorepo_auth_token);
        const { data } = await userService.findById(decoded.sub);
        if (data) {
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            photo: data.photo,
          });
        }
      };
      findUser();
    }
  }, []);

  async function signIn({ email, password }: LoginProps) {
    const { user, token } = await userService.login({ email, password });
    console.log(user, token);
    

    setCookie(undefined, 'monorepo_auth_token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (user) {
      setUser({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        photo: user?.photo,
      });
    }

    Router.push('/cats');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
