import axios from 'axios';

class CatsService {
  async listRandomDog() {
    try {
      const { data } = await axios.get('https://aws.random.cat/meow');
      return data.file;
    } catch (error) {
      return error.message;
    }
  }
}
export default new CatsService();
