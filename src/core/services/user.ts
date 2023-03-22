import { appApi } from '../clients/appApi';
import type { UserLoginData } from '../../globalTypes/globalTypes';

export const sendLoginRequest = async (loginData: UserLoginData) => {
  return await appApi.post('/users', loginData);
};
