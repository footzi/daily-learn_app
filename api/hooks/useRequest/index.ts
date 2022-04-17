import axios, { AxiosRequestConfig } from 'axios';
import useAxios, { UseAxiosResult } from 'axios-hooks';
import { checkAccessToken, getToken } from '../../helpers';
import { getRequestConfig } from '../../utils';
import { API_LIST } from '../../constants';
import { LocalStorage } from '@libs';
import { TOKENS_LS } from '@constants';
import { Options, UseRequestResult } from './interfaces';
import { useCallback, useContext, useEffect } from 'react';
import { AppContext, setErrorNotification } from '../../../store/new-store';

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

export const useRequest = (config: AxiosRequestConfig, options?: Options): UseRequestResult => {
  const [{ data, loading, error }, request] = useAxios(config, {
    ...options,
    manual: true,
  });

  const { dispatch } = useContext(AppContext);

  const execute = useCallback(async (config?: AxiosRequestConfig, options?: Options) => {
    const isValidAccessToken = await checkAccessToken();

    if (!isValidAccessToken) {
      await refreshToken();
    }

    const token = await getToken(false);

    try {
      await request(
        {
          ...config,
          headers: { Authorization: token },
        },
        options
      );

      options?.onSuccess && options.onSuccess();
    } catch (error) {
      options?.onError && options.onError();
      // @todo текст ошибки с бэка не прокидывается в error
      dispatch(setErrorNotification(error.message));
    }
  }, []);

  useEffect(() => {
    if (!options?.manual) {
      execute(config, options);
    }
  }, []);

  return [
    {
      data,
      loading,
      error,
    },
    execute,
  ];
};
