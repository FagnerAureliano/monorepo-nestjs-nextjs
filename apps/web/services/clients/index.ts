/* eslint-disable @typescript-eslint/no-inferrable-types */
import axios from '../../lib/axios';

interface ClientProps {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: {
    zipcode: string;
    city: string;
    street: string;
    number: string;
  };
}

class ClientsService {
  async findAll(page: number = 0, size: number = 5) {
    try {
      return await axios.get(`/clients?page=${page}&size=${size}`);
    } catch (error) {
      return error;
    }
  }
  async findByID(id: string) {
    try {
      return await axios.get(`/clients/${id}`);
    } catch (error) {
      return error;
    }
  }
  async create(body: ClientProps) {
    try {
      return await axios.post(`/clients`, body);
    } catch (error) {
      return error;
    }
  }
  async update(body: ClientProps) {
    try {
      return await axios.patch(`/clients`, body);
    } catch (error) {
      return error;
    }
  }
}

export default new ClientsService();
