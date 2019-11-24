import { setAuthData } from './helpers';
import { request } from '../store/utils';

export const refreshTokens = async () => {
  const token = await setAuthData('refresh');

  try {
    const response = await request('post', '/api/refresh', '', token);
    const { data } = response.data;
    const { user } = data;

    return user;
  } catch (err) {
    const { error } = err.response.data;
    throw error;
  }
};
