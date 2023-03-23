import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import ApiClient from '../../../lib/api/api-client';

export default NextAuth({
  // secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: 'jwt',
  // },
  // jwt: {
  //   secret: process.env.JWT_SIGNIN_PRIVATE_KEY,
  //   maxAge: 24 * 60 * 60, // 24 hours
  // },
  providers: [
    CredentialsProvider({
      name: 'AuthCredentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email && !credentials?.password) {
            throw new Error('Email e senha requerido.');
          }

          const res = await ApiClient.post('/auth/login', {
            email: credentials?.email,
            password: credentials?.password,
          });
          const user = await res.data;

          if (user) {
            return user;
          }
          throw new Error('Não foi possível autenticar usuário.');
        } catch (error) {
          throw new Error(`Não foi possível autenticar usuário.`);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});
