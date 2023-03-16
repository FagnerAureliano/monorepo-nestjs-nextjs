import axios from '../../lib/axios';

class RandomUsersService {
  async getRandomUsers() {
    try {
      const { data } = await axios.get('/random-users');

      return data;
    } catch (error) {
      return Error(error.message);
    }
  }
}
export default new RandomUsersService();
