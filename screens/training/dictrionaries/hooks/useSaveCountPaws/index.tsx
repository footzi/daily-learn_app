import { useRequest, getRequestConfig, API_LIST } from '@api';
import { useCallback } from 'react';
import { UseSaveCountPawsResult } from './interfaces';

export const useSaveCountPaws = (): UseSaveCountPawsResult => {
  const { url, method } = getRequestConfig(API_LIST.CHANGE_PROFILE);
  const [{ loading }, execute] = useRequest({ url, method }, { manual: true });

  const saveCountPaws = useCallback((paws) => {
    execute({
      data: { paws },
    });
  }, []);

  return {
    saveCountPaws,
  };
};
