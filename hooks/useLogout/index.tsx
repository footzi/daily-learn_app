import { API_LIST, getRequestConfig } from '@api';
import { removeUser, useAppContext } from '@store';
import { useCallback } from 'react';

import { useRequest } from '../useRequest';
import { UseLogoutResult } from './interfaces';

export const useLogout = (): UseLogoutResult => {
  const { url, method } = getRequestConfig(API_LIST.LOGOUT);
  const { dispatch } = useAppContext();

  const [{ loading }, execute] = useRequest(
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
