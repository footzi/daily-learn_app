import { SETTINGS } from '@constants';
import { shuffleArray } from '@libs';
import { CreatedForTrainingWord } from './interfaces';

export const createWords = (allDictionaries = [], selectedDictionaries = []): CreatedForTrainingWord[] => {
  const dictionaries = allDictionaries.filter((item) => selectedDictionaries.includes(item.id));
  const result = [];

  if (!Array.isArray(dictionaries)) {
    return result;
  }

  dictionaries.forEach((dictionary) => {
    if (!dictionary.words.length) {
      return result;
    }

    dictionary.words.forEach((word, index) => {
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

export const getStartIndex = (words) => {
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

export const getNextIndex = (words, currentIndex) => {
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
