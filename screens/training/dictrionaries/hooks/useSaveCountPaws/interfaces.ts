import { UseRequestResult } from '@api';

export interface UseSaveCountPawsResult extends UseRequestResult {
  saveCountPaws: (paws: number) => void;
}
