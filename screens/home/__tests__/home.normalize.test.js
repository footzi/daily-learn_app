import { normalizeDictionaries } from '../normalize';

describe('Home normalize', () => {
  it('normalizeDictionaries is success if data valid', () => {
    const dict = [
      { id: 21, name: "'Ghehh'", words: [] },
      {
        id: 31,
        name: "'Ghehhll'",
        words: [{ id: 51, en: { name: '31', count: 0 }, ru: { name: 'Привет', count: 0 } }],
      },
    ];

    const normalize = normalizeDictionaries(dict);

    const expected = [
      { id: 21, name: "'Ghehh'", checked: false },
      { id: 31, name: "'Ghehhll'", checked: false },
    ];
    expect(normalize).toEqual(expected);
  });

  it('normalizeDictionaries is success if data invalid', () => {
    const dict = [{ words: [] }, {}];

    const normalize = normalizeDictionaries(dict);

    const expected = [
      { id: null, name: '', checked: false },
      { id: null, name: '', checked: false },
    ];
    expect(normalize).toEqual(expected);
  });

  it('normalizeDictionaries is success if dict array is empty', () => {
    const dict = [];

    const normalize = normalizeDictionaries(dict);

    const expected = [];
    expect(normalize).toEqual(expected);
  });

  it('normalizeDictionaries is success if dict is not Array type', () => {
    const dict = '';

    const normalize = normalizeDictionaries(dict);

    const expected = [];
    expect(normalize).toEqual(expected);
  });
});
