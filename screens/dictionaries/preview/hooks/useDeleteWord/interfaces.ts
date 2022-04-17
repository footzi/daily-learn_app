import { UseRequestResult } from '@api';

export interface UseDeleteWordResult extends UseRequestResult {
  deleteWord: (ids: number[], onSuccess: () => void) => void;
}
