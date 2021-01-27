import { Dictionary, Dictionaries } from '@interfaces';
import { NormalizedPreviewDictionary } from './interfaces';

export const normalizePreviewDictionaries = (dictionaries: Dictionaries): NormalizedPreviewDictionary[] => {
  if (!Array.isArray(dictionaries)) {
    return [];
  }

  return dictionaries.map((item: Dictionary) => {
    const { id, name } = item;

    return {
      // todo а зачем тут id и name?
      id: id ? id : null,
      name: name ? name : '',
      isChecked: false,
    };
  });
};
