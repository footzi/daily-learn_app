import { request, setAuthData } from '../store/utils';

export const getMainData = async () => {
  const token = await setAuthData('refresh');

  try {
    const response = await request('get', '/screens/home', '', token);
    const { data } = response.data;

    return data;
  } catch (err) {
    const { error } = err.response.data;

    throw error;
  }
};
