import { API_LIST, getRequestConfig, setTokens, useRequest } from '@api';
import { setUser, useAppContext } from '@store';
import { useCallback, useEffect } from 'react';

import { LoginProps, UseLoginResult } from './interfaces';

/**
 * Хук авторизации
 */
export const useLogin = (): UseLoginResult => {
  const { url, method } = getRequestConfig(API_LIST.LOGIN);
  const { dispatch, state } = useAppContext();

  const [{ data, loading }, execute] = useRequest(
    {
      url,
      method,
    },
    {
      manual: true,
    }
  );

  const login = useCallback((body: LoginProps) => {
    execute({
      data: body,
    });
  }, []);

  useEffect(() => {
    const user = data?.data?.user;
    const tokens = data?.data?.tokens;

    if (tokens) {
      setTokens(tokens);
    }

    if (user) {
      dispatch(setUser(user));
      state.refetchMainData();
    }
  }, [data]);

  return {
    isLoading: loading,
    login,
  };
};
