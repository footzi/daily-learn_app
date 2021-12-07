import axios, { AxiosRequestConfig } from 'axios';
import useAxios, { UseAxiosResult } from 'axios-hooks';
import { checkAccessToken, getToken } from '../../helpers';
import { getRequestConfig } from '../../utils';
import { API_LIST } from '../../constants';
import { LocalStorage } from '@libs';
import { SETTINGS, TOKENS_LS } from '@constants';

const refreshToken = async () => {
  const token = await getToken(true);
  const { url, method } = getRequestConfig(API_LIST.REFRESH_TOKEN);
  const headers = { Authorization: token };

  try {
    const response = await axios({
      method,
      url,
      headers,
    });

    const tokens = response?.data?.tokens;

    if (tokens) {
      await LocalStorage.set(TOKENS_LS, tokens);
    }
  } catch (error) {
    await LocalStorage.remove(TOKENS_LS);
  }
};

export const useRequest = (config: AxiosRequestConfig): UseAxiosResult => {
  let token = '';

  const getISToket = async () => {
    const isValidAccessToken = await checkAccessToken();

    if (!isValidAccessToken) {
      await refreshToken();
    }

    token = await getToken(false);
  };

  getISToket();

  config.headers = { Authorization: token };

  return useAxios(config);
};
