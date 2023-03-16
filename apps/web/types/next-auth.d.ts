import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      name: string;
      email: string;
      role: string;
      photo: string;
    };
  }
}
