import { API_LIST, getRequestConfig, useRequest } from '@api';
import { useAppContext } from '@store';
import { useCallback } from 'react';

import { UseCreateWordResult } from './interfaces';

export const useCreateWord = (): UseCreateWordResult => {
  const { url, method } = getRequestConfig(API_LIST.CREATE_WORD);
  const [{ loading }, execute] = useRequest({ url, method }, { manual: true });

  const { state } = useAppContext();

  const createWord = useCallback((fields, dictionaryId, onSuccess) => {
    execute(
      {
        data: {
          name: JSON.stringify([fields.name]),
          translate: JSON.stringify(fields.translate.map((item) => item.value)),
          dictionary_id: String(dictionaryId),
        },
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
    createWord,
  };
};
