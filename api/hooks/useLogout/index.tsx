import { getRequestConfig, API_LIST } from '@api';
import { useCallback } from 'react';
import { useAppContext, removeUser } from '@store';
import { UseLogoutResult } from './interfaces';
import { useRequest } from '@api';

export const useLogout = (): UseLogoutResult => {
  const { url, method } = getRequestConfig(API_LIST.LOGOUT);
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

  const logout = useCallback(() => {
    execute(null, {
      onSuccess: () => dispatch(removeUser()),
    });
  }, []);

  return {
    isLoading: loading,
    logout,
  };
};
