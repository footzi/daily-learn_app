import { UseRequestResult } from '@api';

export interface UseCreateDictionaryResult extends UseRequestResult {
  createDictionary: (name: string, onSuccess: () => void) => void;
}
