import ApiClient from '../../lib/api/api-client';

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

export const clientService = {
  findAll,
  findByID,
  create,
  update,
  delete: _delete,
};

async function findAll(page = 0, size = 5) {
  try {
    return await ApiClient.get(`/clients?page=${page}&size=${size}`);
  } catch (error) {
    return error;
  }
}
async function findByID(id: string) {
  try {
    return await ApiClient.get(`/clients/${id}`);
  } catch (error) {
    return error;
  }
}
async function create(body: ClientProps) {
  try {
    return await ApiClient.post(`/clients`, body);
  } catch (error) {
    return error;
  }
}
async function update(body: ClientProps) {
  try {
    return await ApiClient.patch(`/clients`, body);
  } catch (error) {
    return error;
  }
}
async function _delete(id: string) {
  try {
    return await ApiClient.delete(`/clients/${id}`);
  } catch (error) {
    return error;
  }
}
