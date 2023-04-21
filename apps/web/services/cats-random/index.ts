import axios from 'axios';

export async function getRandomCatImage() {
  try {
    const response = await axios.get('https://cataas.com/cat', {
      responseType: 'arraybuffer',
    });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const image = `data:image/png;base64,${base64}`;
    return image;
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to get cat image');
  }
}