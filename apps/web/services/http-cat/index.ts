import { api } from '../../api';

class HttpCatsService {
  async findStatusCatByCode(code: string) {
    try {
      return await api.get(`/http-status-cat/${code}`);
    } catch (error) {
      return error;
    }
  }
}

export default new HttpCatsService();
