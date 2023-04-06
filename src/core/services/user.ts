import { appApi } from '../clients/appApi';
import type { UserLoginData } from '../../globalTypes/globalTypes';
import type { MutationFunction } from 'react-query';

interface LoginResponse{
  token: string
}
export const sendLoginRequest: MutationFunction<LoginResponse, UserLoginData> = async (loginData: UserLoginData) => {
  return await appApi.post('/users', loginData).then(res=>res?.json());
};
