// https://codepen.io/footzi/pen/bGGEjMw?editors=1010
// https://codepen.io/footzi/pen/OJJMBBq?editors=1010
import Settings from '../../../constants/Settings';
import shuffleArray from '../../utils/shuffle-array';

export const createWords = dictionaries => {
  const result = [];
  
  dictionaries.forEach((item) => {
    item.words.forEach(item => {
      result.push({
        id: item.id,
        id_unique: item.id + '_en',
        lang: 'en',
        question: item.en.name,
        answer: item.ru.name,
        count: item.en.count,
        isShow: item.en.count < Settings.attempt
      });
    
      result.push({
        id: item.id,
        id_unique: item.id + '_ru',
        lang: 'ru',
        question: item.ru.name,
        answer: item.en.name,
        count: item.ru.count,
        isShow: item.ru.count < Settings.attempt
      });
    });
  });
  
  return shuffleArray(result);
};

export const getNext = (words, current) => {
  // проверяем от текущего до конца массива
  const next_from = words.findIndex((item, index) => index >= current + 1 && item.isShow);
  // проверяем от начала массива
  const next_to = words.findIndex(item => item.isShow);

  if (next_from + 1) {
    return next_from;
  }

  if (next_to + 1) {
    return next_to;
  }
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
