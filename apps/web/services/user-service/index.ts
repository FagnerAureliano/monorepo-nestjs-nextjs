import { api } from '../../api';

export interface LoginProps {
  email: string;
  password: string;
}

class UserService {
  async login(body: LoginProps) {
    try {
      const { data } = await api.post('/auth/login', body);
      return data;
    } catch (error) {
      return error;
    }
  }
}
export default new UserService();
