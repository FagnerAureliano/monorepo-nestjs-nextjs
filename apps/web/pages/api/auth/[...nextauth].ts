import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { api } from '../../../api';

export const authOptions = {
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
        // const data = {
        //   email: credentials.email,
        //   password: credentials.password,
        // };

        // console.log(credentials.email, req);
        // // const { user, token } = await userService.login(data);

        // // const res = await fetch(
        // //   process.env.NEXTAUTH_URL +'/auth/login',
        // //   {
        // //     method: 'POST',
        // //     body: JSON.stringify(credentials),
        // //     headers: { 'Content-Type': 'application/json' },
        // //   }
        // // );
        const res = await api.post('auth/login', credentials);
        console.log(res);

        // const user = await res.json();

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.SECRET,
};
export default NextAuth(authOptions);
