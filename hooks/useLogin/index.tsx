import { API_LIST, getRequestConfig, setTokens } from '@api';
import { setUser, useAppContext } from '@store';
import { useCallback, useEffect } from 'react';

import { useRequest } from '../useRequest';
import { LoginProps, UseLoginResult } from './interfaces';

/**
 * Хук авторизации
 */
export const useLogin = (): UseLoginResult => {
  const { url, method } = getRequestConfig(API_LIST.LOGIN);
  const { dispatch } = useAppContext();

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
    }
  }, [data]);

  return {
    isLoading: loading,
    login,
  };
};
