import ApiClient from '../../lib/api/api-client';

export const httpStatusService = {
  findByCode,
};

async function findByCode(code: string) {
  try {
    return await ApiClient.get(`/http-status-cat/${code}`);
  } catch (error) {
    return error;
  }
}
