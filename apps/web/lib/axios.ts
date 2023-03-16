import axios from 'axios';
import { useSession } from 'next-auth/react';

export default axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosAuth = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  headers: { 'Content-Type': 'application/json' },
});

// axios.interceptors.request.use(async function (config) {
//   const { data: session } = useSession();
//   console.log(session);

//   config.headers.Authorization = session.user.accessToken
//     ? `Bearer ${session.user.accessToken}`
//     : '';
//   return config;
// });
