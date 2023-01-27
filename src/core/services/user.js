import { appApi } from '../clients/appApi';

export const sendLoginRequest = async (userData) => {
  return await appApi.post('/users', userData);
};
