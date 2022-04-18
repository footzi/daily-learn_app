import { API_LIST, getRequestConfig } from '@api';
import { useAppContext } from '@store';
import { useCallback } from 'react';

import { useRequest } from '../../../../hooks';

export const useDeleteDictionary = () => {
  const { url, method } = getRequestConfig(API_LIST.DELETE_DICTIONARY);
  const [{ loading, error }, execute] = useRequest({ url, method }, { manual: true });

  const { state } = useAppContext();

  const deleteDictionary = useCallback((id, onSuccess) => {
    execute(
      {
        data: { id: String(id) },
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
    error,
    deleteDictionary,
  };
};
