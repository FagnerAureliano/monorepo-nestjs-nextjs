import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/api/v1/',
});

// api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// const token = sessionStorage.getItem('auth_token');

// if (token) {
//   const data = JSON.parse(token);
//   console.log(data.token, 55555555);

//   api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
// }
