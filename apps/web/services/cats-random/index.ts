import axios from 'axios';

export async function getRandomCats() {
  try {
    const { data } = await axios.get('https://aws.random.cat/meow');
    return data.file;
  } catch (error) {
    return Error(error.message);
  }
}
