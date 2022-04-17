import { useRequest, getRequestConfig, API_LIST } from '@api';
import { useCallback, useContext } from 'react';
import { UseDeleteWordResult } from './interfaces';
import { AppContext } from '../../../../../store/new-store';

export const useDeleteWord = (): UseDeleteWordResult => {
  const { url, method } = getRequestConfig(API_LIST.DELETE_WORD);
  const [{ loading }, execute] = useRequest({ url, method }, { manual: true });

  const { state } = useContext(AppContext);

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
