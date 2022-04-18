import { API_LIST, getRequestConfig } from '@api';
import { useAppContext } from '@store';
import { useCallback } from 'react';

import { useRequest } from '../../../../hooks';
import { UseCreateDictionaryResult } from './interfaces';

export const useCreateDictionary = (): UseCreateDictionaryResult => {
  const { url, method } = getRequestConfig(API_LIST.CREATE_DICTIONARY);
  const [{ loading }, execute] = useRequest({ url, method }, { manual: true });

  const { state } = useAppContext();

  const createDictionary = useCallback((name, onSuccess) => {
    execute(
      {
        data: { name },
      },
      {
        onSuccess: () => {
          state.refetchMainData();
          onSuccess();
        },
      }
    );
  }, []);

  return {
    isLoading: loading,
    createDictionary,
  };
};
