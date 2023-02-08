import axios from 'axios';

class DogsService {
  async listRandomDog() {
    try {
      const dog = await axios.get('https://random.dog/woof.json?filter=mp4,webm');
      return dog.data.url;
    } catch (error) {
      return error.message;
    }
  }
}
export default new DogsService();
