import { UseRequestResult } from '@api';
import { SaveFieldsWord } from '../../interfaces';

export interface UseCreateWordResult extends UseRequestResult {
  createWord: (fields: SaveFieldsWord, dictionaryId: number, onSuccess: () => void) => void;
}
