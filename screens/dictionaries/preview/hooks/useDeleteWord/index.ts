import { API_LIST, getRequestConfig } from '@api';
import { useAppContext } from '@store';
import { useCallback } from 'react';

import { useRequest } from '../../../../../hooks';
import { UseDeleteWordResult } from './interfaces';

export const useDeleteWord = (): UseDeleteWordResult => {
  const { url, method } = getRequestConfig(API_LIST.DELETE_WORD);
  const [{ loading }, execute] = useRequest({ url, method }, { manual: true });

  const { state } = useAppContext();

  const deleteWord = useCallback((ids, onSuccess) => {
    execute(
      {
        data: {
          ids: JSON.stringify(ids),
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
    deleteWord,
  };
};
