import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { api } from '../../../http';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SIGNIN_PRIVATE_KEY,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'AuthCredentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const url = `${process.env.NEXTAUTH_URL}/auth/login`;

        try {
          if (!credentials?.email && !credentials?.password) {
            throw new Error('Email e senha requerido.');
          }

          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          const user = await res.json();

          if (res.ok && user) {
            return user;
          }
          throw new Error('Não foi possível autenticar usuário.');
          // return null;
        } catch (error) {
          console.error('Erro ao autenticar usuário:', error.message);
          throw new Error('Não foi possível autenticar usuário.');
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});
