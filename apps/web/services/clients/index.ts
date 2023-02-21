/* eslint-disable @typescript-eslint/no-inferrable-types */
import { api } from '../../api';

class ClientsService {
  async findAll(page: number = 0, size: number = 5) {
    try {
      return await api.get(`/clients?page=${page}&size=${size}`);
    } catch (error) {
      return error;
    }
  }
}

export default new ClientsService();
