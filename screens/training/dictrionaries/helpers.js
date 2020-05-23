// https://codepen.io/footzi/pen/bGGEjMw?editors=1010
// https://codepen.io/footzi/pen/OJJMBBq?editors=1010
import { SETTINGS } from '@constants/settings';
import { shuffleArray } from '@libs';

export const createWords = (allDictionaries = [], selectedDictionaries = []) => {
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

export const getStartWord = (words) => {
  if (!words.length) {
    return null;
  }

  if (words[0].isShow) {
    return words[0];
  }

  const word = words.find((item) => item.isShow);

  if (word) {
    return word;
  } else {
    return null;
  }
};

export const getNextWord = (words, currentWord) => {
  const currentIndex = words.findIndex((item) => item.uid === currentWord.uid);

  const nextFrom = words.find((item, index) => index >= currentIndex + 1 && item.isShow);

  // const nextFrom = words.findIndex((item, index) => index >= currentIndex + 1 && item.isShow);
  // // проверяем от начала массива
  const nextTo = words.find((item) => item.isShow);
  //
  if (nextFrom) {
    return nextFrom;
  }

  if (nextTo) {
    return nextTo;
  }

  return null;
};

// export const getNextIndex = (words, currentWord) => {
//   const currentIndex = words.findIndex((item) => item.uid === currentWord.uid);
//
//   const nextFrom = words.findIndex((item, index) => index >= currentIndex + 1 && item.isShow);
//   // проверяем от начала массива
//   const nextTo = words.findIndex((item) => item.isShow);
//
//   if (nextFrom + 1) {
//     return nextFrom;
//   }
//
//   if (nextTo + 1) {
//     return nextTo;
//   }
//
//   return null;
// };

// export const getNext = (words, currentIndex) => {
//   // проверяем от текущего до конца массива
//   //const nextFrom = words.findIndex((item, index) => index >= currentIndex + 1 && item.isShow);
//   const nextFrom = words.findIndex((item, index) => index >= currentIndex + 1 && item.isShow);
//   // проверяем от начала массива
//   const nextTo = words.findIndex((item) => item.isShow);
//
//   if (nextFrom + 1) {
//     return words[nextFrom];
//   }
//
//   if (nextTo + 1) {
//     return words[nextTo];
//   }
//
//   return null;
// };
