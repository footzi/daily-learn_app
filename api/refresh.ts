import axios, { AxiosError } from 'axios';

import { API_LIST } from './constants';
import { getToken } from './helpers';
import { getRequestConfig, setTokens } from './utils';

export const refresh = async (failedRequest: AxiosError): Promise<void | string | undefined> => {
  const savedRefreshToken = await getToken(true);

  if (!savedRefreshToken) {
    return Promise.reject();
  }

  try {
    const { url, method } = getRequestConfig(API_LIST.REFRESH_TOKEN);

    const response = await axios({
      method,
      url,
      headers: {
        Authorization: savedRefreshToken,
      },
    });

    const tokens = response?.data?.data?.tokens;

    if (tokens) {
      await setTokens(tokens);

      if (failedRequest?.response?.config?.headers) {
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokens.access_token;
      }
      return Promise.resolve();
    } else {
      return Promise.reject('Ошибка авторизации');
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
