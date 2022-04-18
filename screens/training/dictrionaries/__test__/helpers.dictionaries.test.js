import { SETTINGS } from '../../../../constants';
import { createWords, getNext } from '../helpers';

jest.mock('../../../../libs/shuffle-array.js', () => {
  return {
    shuffleArray: (array) => array,
  };
});

describe('Training Dictionaries Helpers', () => {
  describe('CreateWords Helper', () => {
    it('CreateWords is successful if dictionaries length, count < SETTINGS.attempt', () => {
      const dictionaries = [
        {
          id: 11,
          name: 'Hello',
          words: [],
        },
        {
          id: 31,
          name: 'Goodbye',
          words: [
            {
              id: 51,
              en: {
                name: 'Cat',
                count: 0,
              },
              ru: {
                name: 'Кот',
                count: 0,
              },
            },
          ],
        },
      ];

      const expectedWords = [
        {
          id: 51,
          id_unique: '51_en',
          lang: 'en',
          question: 'Cat',
          answer: 'Кот',
          count: 0,
          isShow: true,
        },
        {
          id: 51,
          id_unique: '51_ru',
          lang: 'ru',
          question: 'Кот',
          answer: 'Cat',
          count: 0,
          isShow: true,
        },
      ];

      const createdWords = createWords(dictionaries);

      expect(createdWords).toEqual(expectedWords);
    });

    it('CreateWords is successful if dictionaries length, count > SETTINGS.attempt', () => {
      const dictionaries = [
        {
          id: 31,
          name: 'Goodbye',
          words: [
            {
              id: 51,
              en: {
                name: 'Cat',
                count: SETTINGS.attempt + 10,
              },
              ru: {
                name: 'Кот',
                count: 0,
              },
            },
          ],
        },
      ];

      const expectedWords = [
        {
          id: 51,
          id_unique: '51_en',
          lang: 'en',
          question: 'Cat',
          answer: 'Кот',
          count: SETTINGS.attempt + 10,
          isShow: false,
        },
        {
          id: 51,
          id_unique: '51_ru',
          lang: 'ru',
          question: 'Кот',
          answer: 'Cat',
          count: 0,
          isShow: true,
        },
      ];

      const createdWords = createWords(dictionaries);

      expect(createdWords).toEqual(expectedWords);
    });

    it('CreateWords is successful if dictionaries not length', () => {
      const dictionaries = [];
      const expectedWords = [];

      const createdWords = createWords(dictionaries);

      expect(createdWords).toEqual(expectedWords);
    });

    it('CreateWords is successful if dictionaries not array', () => {
      const dictionaries = '';
      const expectedWords = [];

      const createdWords = createWords(dictionaries);

      expect(createdWords).toEqual(expectedWords);
    });
  });
  describe('GetNext Helper', () => {
    it('getNext is successful if current word have +1', () => {
      const words = [
        {
          id: 51,
          id_unique: '51_en',
          lang: 'en',
          question: 'Cat',
          answer: 'Кот',
          count: 0,
          isShow: true,
        },
        {
          id: 51,
          id_unique: '51_ru',
          lang: 'ru',
          question: 'Кот',
          answer: 'Cat',
          count: 0,
          isShow: true,
        },
      ];
      const currentWord = words[0];
      const expectedWords = words[1];

      const nextWord = getNext(words, currentWord);

      expect(nextWord).toEqual(expectedWords);
    });

    it('getNext is successful if next word isShow false', () => {
      const words = [
        {
          id: 51,
          id_unique: '51_en',
          lang: 'en',
          question: 'Cat',
          answer: 'Кот',
          count: 0,
          isShow: true,
        },
        {
          id: 51,
          id_unique: '51_ru',
          lang: 'ru',
          question: 'Кот',
          answer: 'Cat',
          count: 0,
          isShow: false,
        },
      ];
      const currentWord = words[0];
      const expectedWords = words[0];

      const nextWord = getNext(words, currentWord);

      expect(nextWord).toEqual(expectedWords);
    });

    it('getNext is successful if current word in end array', () => {
      const words = [
        {
          id: 51,
          id_unique: '51_en',
          lang: 'en',
          question: 'Cat',
          answer: 'Кот',
          count: 0,
          isShow: true,
        },
        {
          id: 51,
          id_unique: '51_ru',
          lang: 'ru',
          question: 'Кот',
          answer: 'Cat',
          count: 0,
          isShow: true,
        },
      ];
      const currentWord = words[1];
      const expectedWords = words[0];

      const nextWord = getNext(words, currentWord);

      expect(nextWord).toEqual(expectedWords);
    });

    it('getNext is successful if current word in end array and next word isShow false', () => {
      const words = [
        {
          id: 51,
          id_unique: '51_en',
          lang: 'en',
          question: 'Cat',
          answer: 'Кот',
          count: 0,
          isShow: false,
        },
        {
          id: 51,
          id_unique: '51_ru',
          lang: 'ru',
          question: 'Кот',
          answer: 'Cat',
          count: 0,
          isShow: true,
        },
      ];
      const currentWord = words[1];
      const expectedWords = words[1];

      const nextWord = getNext(words, currentWord);

      expect(nextWord).toEqual(expectedWords);
    });
  });

  it('getNext is null if all words isShow false', () => {
    const words = [
      {
        id: 51,
        id_unique: '51_en',
        lang: 'en',
        question: 'Cat',
        answer: 'Кот',
        count: 0,
        isShow: false,
      },
      {
        id: 51,
        id_unique: '51_ru',
        lang: 'ru',
        question: 'Кот',
        answer: 'Cat',
        count: 0,
        isShow: false,
      },
    ];
    const currentWord = words[0];

    const nextWord = getNext(words, currentWord);

    expect(nextWord).toEqual(null);
  });
});
