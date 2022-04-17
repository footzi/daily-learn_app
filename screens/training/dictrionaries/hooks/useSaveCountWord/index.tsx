import { useRequest, getRequestConfig, API_LIST } from '@api';
import { useCallback, useContext } from 'react';
import { UseSaveCountWordResult } from './interfaces';
import { AppContext } from '../../../../../store/new-store';

export const useSaveCountWord = (): UseSaveCountWordResult => {
  const { url, method } = getRequestConfig(API_LIST.CHANGE_COUNT_WORD);
  const [{ loading }, execute] = useRequest({ url, method }, { manual: true });

  const { state } = useContext(AppContext);

  const saveCountWord = useCallback((id, type) => {
    execute({
      data: { id: String(id), type },
    });
  }, []);

  return {
    saveCountWord,
  };
};
