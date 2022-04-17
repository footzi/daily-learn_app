import { useRequest, getRequestConfig, API_LIST } from '@api';
import { useCallback, useContext } from 'react';
import { UseCreateDictionaryResult } from './interfaces';
import { AppContext } from '../../../../store/new-store';

export const useCreateDictionary = (): UseCreateDictionaryResult => {
  const { url, method } = getRequestConfig(API_LIST.CREATE_DICTIONARY);
  const [{ loading }, execute] = useRequest({ url, method }, { manual: true });

  const { state } = useContext(AppContext);

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
