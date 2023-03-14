import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { api } from '../../../api';

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
        if (!credentials?.email && !credentials?.password) {
          throw new Error('Email e senha requerido.');
        }

        // const { data } = await api.post('auth/login', credentials);
        // console.log( data);

        const url = `${process.env.NEXTAUTH_URL}/auth/login`;

        return await fetch(url, {
          method: 'POST',
          headers: { 'Content-type': 'application/json;charset=UTF-8' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            const authorization = { id: res.token };

            if (authorization?.id) {
              console.log(authorization);

              return authorization;
            } else {
              throw new Error('Usuário não encontrado.');
            }
          })
          .catch((e) => {
            console.log('error auth', e);
            if (e.message == 'fetch failed') {
              throw new Error('Ocorreu um erro inesperado.');
            }
            throw new Error(e.message);
          });
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      console.log(token+ 'oooooooooooooooooooo');
      
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
