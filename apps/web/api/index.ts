import axios from 'axios';
import { parseCookies } from 'nookies';

export const api = axios.create({
  // baseURL: 'https://monorepo-server-8qby.onrender.com/api/v1/',
  // baseURL: 'http://localhost:3333/api/v1/',
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const { monorepo_auth_token } = parseCookies();

if (monorepo_auth_token) {
  api.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${monorepo_auth_token}`;

  api.interceptors.request.use((res) => {
    console.log(res);
    return res;
  });
}
