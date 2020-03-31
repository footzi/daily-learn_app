// https://codepen.io/footzi/pen/bGGEjMw?editors=1010
// https://codepen.io/footzi/pen/OJJMBBq?editors=1010
import { SETTINGS } from '@constants/settings';
import { shuffleArray } from '@libs';

export const createWords = dictionaries => {
  const result = [];

  if (!Array.isArray(dictionaries)) {
    return result;
  }

  dictionaries.forEach(dictionary => {
    dictionary.words.forEach(word => {
      const { id, groupId, name, translate, count } = word;

      const translates = dictionary.words.filter(item => item.groupId === groupId).map(item => item.translate);

      result.push({
        id,
        // uid: Date.now() + id,
        type: 'name',
        question: name,
        answers: translates,
        count,
        isShow: count < SETTINGS.attempt
      });

      result.push({
        id,
        // uid: Date.now() + id,
        type: 'translate',
        question: translate,
        answers: [name],
        count,
        isShow: count < SETTINGS.attempt
      });

      // result.push({
      //   id: id,
      //   id_unique: id + '_ru',
      //   lang: 'ru',
      //   question: ru.name,
      //   answer: en.name,
      //   count: ru.count,
      //   isShow: ru.count < SETTINGS.attempt
      // });

      // result.push({
      //   id,
      //   id_unique: id + '_en',
      //   lang: 'en',
      //   question: en.name,
      //   answer: ru.name,
      //   count: en.count,
      //   isShow: en.count < SETTINGS.attempt
      // });
      //
      // result.push({
      //   id: id,
      //   id_unique: id + '_ru',
      //   lang: 'ru',
      //   question: ru.name,
      //   answer: en.name,
      //   count: ru.count,
      //   isShow: ru.count < SETTINGS.attempt
      // });
    });
  });

  return shuffleArray(result);
};

export const getNext = (words, current_word) => {
  const index_word = words.findIndex(item => item.id_unique === current_word.id_unique);
  // проверяем от текущего до конца массива
  const next_from = words.findIndex((item, index) => index >= index_word + 1 && item.isShow);
  // проверяем от начала массива
  const next_to = words.findIndex(item => item.isShow);

  if (next_from + 1) {
    return words[next_from];
  }

  if (next_to + 1) {
    return words[next_to];
  }

  return null;
};

export const getPrev = (words, current) => {
  let prev_from = '';
  let prev_to = '';

  // проверям от текущего к началу массива
  words.forEach((item, index) => {
    if (current - 1 >= index && item.isShow) {
      prev_from = index;
    }
  });

  // проверям от конца массива к текущему
  words.forEach((item, index) => {
    if (current <= index && item.isShow) {
      prev_to = index;
    }
  });

  if (prev_from !== '') {
    return prev_from;
  }

  if (prev_to !== '') {
    return prev_to;
  }
};
