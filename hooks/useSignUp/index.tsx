import { API_LIST, getRequestConfig, setTokens } from '@api';
import { setUser, useAppContext } from '@store';
import { useCallback, useEffect } from 'react';

import { useRequest } from '../useRequest';
import { SignUpBody, UseSignUpResult } from './interfaces';

/**
 * Хук регистрации пользователя
 */
export const useSignUp = (): UseSignUpResult => {
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

  const signUp = useCallback((body: SignUpBody) => {
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
    signUp,
  };
};
