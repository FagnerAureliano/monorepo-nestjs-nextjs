import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

api.interceptors.request.use(async function (config) {
  const session: any = await getSession();
  config.headers.Authorization = session.accessToken
    ? `Bearer ${session.accessToken}`
    : '';
  return config;
});
