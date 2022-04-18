import { API_LIST, getRequestConfig } from '@api';
import { useCallback } from 'react';

import { useRequest } from '../../../../../hooks';
import { UseSaveCountPawsResult } from './interfaces';

export const useSaveCountPaws = (): UseSaveCountPawsResult => {
  const { url, method } = getRequestConfig(API_LIST.CHANGE_PROFILE);
  const [_, execute] = useRequest({ url, method }, { manual: true });

  const saveCountPaws = useCallback((paws) => {
    execute({
      data: { paws },
    });
  }, []);

  return {
    saveCountPaws,
  };
};
