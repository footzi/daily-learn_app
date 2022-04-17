import { useRequest, getRequestConfig, API_LIST } from '@api';
import { useCallback, useContext } from 'react';
import { AppContext } from '../../../../store/new-store';

export const useDeleteDictionary = () => {
  const { url, method } = getRequestConfig(API_LIST.DELETE_DICTIONARY);
  const [{ data, loading, error }, execute] = useRequest({ url, method }, { manual: true });

  const { state } = useContext(AppContext);

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
