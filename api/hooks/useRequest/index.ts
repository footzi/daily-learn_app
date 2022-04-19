import { getToken } from '@api';
import { Maybe } from '@interfaces';
import { setErrorNotification, useAppContext } from '@store';
import Axios, { AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import useAxios, { configure } from 'axios-hooks';
import { useCallback, useEffect, useState } from 'react';

import { refresh } from '../../refresh';
import { Options, UseRequestResult } from './interfaces';

const axios = Axios.create();

configure({ axios });
createAuthRefreshInterceptor(axios, refresh);

export const useRequest = (config: AxiosRequestConfig, options?: Options): UseRequestResult => {
  const { dispatch } = useAppContext();

  const [{ data, loading, error }, request] = useAxios(config, {
    ...options,
    manual: true,
  });

  const execute = useCallback(async (config: Maybe<AxiosRequestConfig>, options?: Options) => {
    try {
      const token = await getToken();

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
      dispatch(setErrorNotification(error?.message));
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
