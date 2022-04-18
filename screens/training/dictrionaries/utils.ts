import { SETTINGS } from '@constants';
import { Dictionaries, Dictionary, Word } from '@interfaces';
import { shuffleArray } from '@libs';
import { SelectedDictionaryForTraining } from '@navigation';

import { CreatedForTrainingWords } from './interfaces';

export const createWords = (
  allDictionaries: Dictionaries,
  selectedDictionaries: SelectedDictionaryForTraining[]
): CreatedForTrainingWords => {
  // todo что-то странное
  // @ts-ignore
  const dictionaries = allDictionaries.filter((item: Dictionary) => selectedDictionaries.includes(item.id));
  const result = [];

  if (!Array.isArray(dictionaries)) {
    return result;
  }

  dictionaries.forEach((dictionary) => {
    if (!dictionary.words.length) {
      return result;
    }

    dictionary.words.forEach((word: Word, index: number) => {
      const { id, groupId, name, translate, nameCount, translateCount } = word;

      const translates = dictionary.words.filter((item) => item.groupId === groupId).map((item) => item.translate);

      result.push({
        id,
        uid: id + index,
        type: 'name',
        question: name,
        answers: translates,
        count: nameCount,
        isShow: nameCount < SETTINGS.attempt,
      });

      result.push({
        id,
        uid: id + index + 1,
        type: 'translate',
        question: translate,
        answers: [name],
        count: translateCount,
        isShow: translateCount < SETTINGS.attempt,
      });
    });
  });

  return shuffleArray(result);
};

export const getStartIndex = (words: CreatedForTrainingWords): number => {
  if (!words.length) {
    return null;
  }

  if (words[0].isShow) {
    return 0;
  }

  const index = words.findIndex((item) => item.isShow);

  if (index + 1) {
    return index;
  } else {
    return null;
  }
};

export const getNextIndex = (words: CreatedForTrainingWords, currentIndex: number): number => {
  const nextFrom = words.findIndex((item, index) => index >= currentIndex + 1 && item.isShow);
  // проверяем от начала массива
  const nextTo = words.findIndex((item) => item.isShow);

  if (nextFrom + 1) {
    return nextFrom;
  }

  if (nextTo + 1) {
    return nextTo;
  }

  return null;
};
