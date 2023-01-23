import axios from 'axios';
import { parseCookies } from 'nookies';

export const api = axios.create({
  baseURL: 'http://localhost:3333/api/v1/',
});

const { monorepo_auth_token } = parseCookies();

console.log(monorepo_auth_token);
if (monorepo_auth_token) {
  
  api.defaults.headers.common['Authorization'] = `Bearer ${monorepo_auth_token}`;
  console.log(monorepo_auth_token);
  
  api.interceptors.request.use(res => {
    console.log(res);
    return res
  })
}
// api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// const token = sessionStorage.getItem('auth_token');

// if (token) {
//   const data = JSON.parse(token);
//   console.log(data.token, 55555555);

//   api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
// }
