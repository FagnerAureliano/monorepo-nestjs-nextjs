import axios from '../../lib/api/api-client';

export const randomUserService = {
  findAll,
};

async function findAll() {
  try {
    const { data } = await axios.get('/random-users');

    return data;
  } catch (error) {
    return Error(error.message);
  }
}
