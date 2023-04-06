import axios from '../../lib/api/api-client';

export interface LoginProps {
  email: string;
  password: string;
}

export const userService = {
  login,
  findAll,
  findByID,
  findByEmail,
  create,
  update,
  delete: _delete,
};

async function login({ email, password }: LoginProps) {
  try {
    const { data } = await axios.post('/auth/login', { email, password }); 
    return data;
  } catch (error) {
    return error;
  }
}
async function findByID(id: string) {
  try {
    return await axios.get(`/users/${id}`);
  } catch (error) {
    return error;
  }
}
async function findByEmail(email: string) {
  try {
    return await axios.get(`/users/email/${email}`);
  } catch (error) {
    return error;
  }
}
async function create(data: any) {
  try {
    return await axios.post(`/users`, data);
  } catch (error) {
    return error;
  }
}
async function findAll() {
  try {
    return await axios.get(`/users`);
  } catch (error) {
    return error;
  }
}
async function update(data: any) {
  try {
    return await axios.patch(`/users`, data);
  } catch (error) {
    return error;
  }
}
async function _delete(id: string) {
  try {
    return await axios.delete(`/users/${id}`);
  } catch (error) {
    return error;
  }
}
