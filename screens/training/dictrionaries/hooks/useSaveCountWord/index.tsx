import { API_LIST, getRequestConfig, useRequest } from '@api';
import { useCallback } from 'react';

import { UseSaveCountWordResult } from './interfaces';

export const useSaveCountWord = (): UseSaveCountWordResult => {
  const { url, method } = getRequestConfig(API_LIST.CHANGE_COUNT_WORD);
  const [_, execute] = useRequest({ url, method }, { manual: true });

  const saveCountWord = useCallback((id, type) => {
    execute({
      data: { id: String(id), type },
    });
  }, []);

  return {
    saveCountWord,
  };
};
