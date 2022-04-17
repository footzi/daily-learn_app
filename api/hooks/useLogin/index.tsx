import useAxios from 'axios-hooks';
import { getRequestConfig, setTokens } from '../../utils';
import { API_LIST } from '../../constants';
import { useCallback, useContext, useEffect } from 'react';
import { ACTIONS, AppContext } from '../../../store/new-store';
import { LoginProps, UseLoginResult, UseLoginRequestResult } from './interfaces';

/**
 * Хук авторизации
 */
export const useLogin = (): UseLoginResult => {
  const { url, method } = getRequestConfig(API_LIST.LOGIN);
  const { dispatch } = useContext(AppContext);

  const [{ data, loading, error }, execute] = useAxios<UseLoginRequestResult>(
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

    setTokens(tokens);

    if (user) {
      dispatch({
        type: ACTIONS.SET_USER,
        payload: user,
      });
    }
  }, [data]);

  return {
    isLoading: loading,
    error,
    login,
  };
};
