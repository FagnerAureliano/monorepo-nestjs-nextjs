import { api } from '../../http';

export interface LoginProps {
  email: string;
  password: string;
}

class UserService {
  async login({ email, password }: LoginProps) { 
    
    try {
      const { data } = await api.post('/auth/login', { email, password });
      console.log(data);
      
      return data;
    } catch (error) {
      return error;
    }
  }
  async findById(id: string) {
    try {
      return await api.get(`/users/${id}`);
    } catch (error) {
      return error;
    }
  }
  async create(data: any) {
    try {
      return await api.post(`/users`, data);
    } catch (error) {
      return error;
    }
  }
}
export default new UserService();
