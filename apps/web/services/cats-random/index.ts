import axios from 'axios';

class CatsService {
  async getRandomCats() {
    try {
      const { data } = await axios.get('https://aws.random.cat/meow'); 
      return data.file;
    } catch (error) {
      return Error(error.message);
    }
  }
}
export default new CatsService();
