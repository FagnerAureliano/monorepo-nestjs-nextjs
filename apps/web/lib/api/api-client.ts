import axios from 'axios';
import { getSession } from 'next-auth/react';

const baseURL = process.env.NEXTAUTH_URL || 'http://localhost:3333/api/v1';

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      request.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`Error: `, error);
    }
  );

  return instance;
};

export default ApiClient();
