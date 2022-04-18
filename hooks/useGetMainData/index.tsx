import { API_LIST, getRequestConfig } from '@api';
import { setDictionaries, setRefetchMainData, setUser, useAppContext } from '@store';
import { useEffect } from 'react';

import { useRequest } from '../useRequest';
import { UseGetMainDataResult } from './interfaces';

/**
 * Хук получения основных данных
 */
export const useGetMainData = (): UseGetMainDataResult => {
  const { url, method } = getRequestConfig(API_LIST.MAIN_DATA);

  const [{ data, loading }, refetch] = useRequest({
    url,
    method,
  });

  const { dispatch } = useAppContext();

  const user = data?.data?.user;
  const dictionaries = data?.data?.dictionaries;

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }

    if (dictionaries) {
      dispatch(setDictionaries(dictionaries));
    }

    dispatch(setRefetchMainData(refetch));
  }, [user, dictionaries]);

  return {
    isLoading: loading,
  };
};
