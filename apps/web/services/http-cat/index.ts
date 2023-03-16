import axios from '../../lib/axios';

class HttpCatsService {
  async findStatusCatByCode(code: string) {
    try {
      return await axios.get(
        process.env.NEXTAUTH_URL + `/http-status-cat/${code}`
      );
    } catch (error) {
      return error;
    }
  }
}

export default new HttpCatsService();
