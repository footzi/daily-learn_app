import { useRequest, getRequestConfig, API_LIST } from '@api';
import { useCallback, useContext } from 'react';
import { UseCreateWordResult } from './interfaces';
import { AppContext } from '../../../../../store/new-store';

export const useCreateWord = (): UseCreateWordResult => {
  const { url, method } = getRequestConfig(API_LIST.CREATE_WORD);
  const [{ loading }, execute] = useRequest({ url, method }, { manual: true });

  const { state } = useContext(AppContext);

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
