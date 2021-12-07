import useAxios from 'axios-hooks';
import { getRequestConfig } from '../../utils';
import { API_LIST } from '../../constants';
import { LocalStorage } from '@libs';
import { TOKENS_LS } from '@constants';
import { UseRequestResult } from '../../interfaces';
import { useContext } from 'react';
import { ACTIONS, AppContext } from '../../../store/new-store';
import { LoginProps, UseLoginResult } from './interfaces';

/**
 * Хук авторизации
 */
export const useLogin = (): UseLoginResult => {
  const { url, method } = getRequestConfig(API_LIST.LOGIN);
  const { dispatch } = useContext(AppContext);

  const [{ data, loading, error }, execute] = useAxios(
    {
      url,
      method,
    },
    {
      manual: true,
    }
  );

  const login = (body: LoginProps) => {
    execute({
      data: body,
    });
  };

  // const { user, tokens } = data?.data;

  // if (tokens) {
  //   await LocalStorage.set(TOKENS_LS, tokens);
  // }

  // if (user) {
  // dispatch({
  //   type: 'SET_USER',
  //   payload: 12345,
  // });
  // }

  dispatch({
    type: ACTIONS.SET_USER,
    payload: {
      id: 12345,
    },
  });

  return {
    loading,
    error,
    login,
  };
};
