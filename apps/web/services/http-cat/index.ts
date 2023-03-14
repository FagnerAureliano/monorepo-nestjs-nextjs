import { api } from '../../http';

class HttpCatsService {
  async findStatusCatByCode(code: string) {
    try {
      return await api.get(process.env.NEXTAUTH_URL+`/http-status-cat/${code}`);
    } catch (error) {
      return error;
    }
  }
}

export default new HttpCatsService();
