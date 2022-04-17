import { UseRequestResult } from '@api';

export interface UseSaveCountWordResult extends UseRequestResult {
  saveCountWord: (id: number, type: string) => void;
}
