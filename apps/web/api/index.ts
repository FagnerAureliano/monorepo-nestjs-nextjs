import axios from 'axios';
import { parseCookies } from 'nookies';

export const api = axios.create({
  baseURL: 'http://localhost:3333/api/v1/',
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
