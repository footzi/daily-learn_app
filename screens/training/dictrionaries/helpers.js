// https://codepen.io/footzi/pen/bGGEjMw?editors=1010
// https://codepen.io/footzi/pen/OJJMBBq?editors=1010
import { SETTINGS } from '@constants/settings';
import shuffleArray from '../../utils/shuffle-array';

export const createWords = dictionaries => {
  const result = [];

  dictionaries.forEach(item => {
    item.words.forEach(item => {
      result.push({
        id: item.id,
        id_unique: item.id + '_en',
        lang: 'en',
        question: item.en.name,
        answer: item.ru.name,
        count: item.en.count,
        isShow: item.en.count < SETTINGS.attempt
      });

      result.push({
        id: item.id,
        id_unique: item.id + '_ru',
        lang: 'ru',
        question: item.ru.name,
        answer: item.en.name,
        count: item.ru.count,
        isShow: item.ru.count < SETTINGS.attempt
      });
    });
  });

  return shuffleArray(result);
};

export const getNext = (words, current_word) => {
  const index_word = words.findIndex(item => item.id_unique === current_word.id_unique);
  // проверяем от текущего до конца массива
  const next_from = words.findIndex((item, index) => index >= index_word + 1 && item.count);
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
