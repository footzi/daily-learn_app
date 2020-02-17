import React from 'react';
import { toHaveTextContent } from '@testing-library/jest-native';
import { renderWithRedux } from '@mocks';
import { DictionaryTrainingScreen } from '../dictionaries';
import { SETTINGS } from '../../../../constants';

expect.extend({ toHaveTextContent });

describe('Training Dictionaries', () => {
  it('Render is successful', () => {
    const initialState = {
      data: {
        dictionaries: []
      }
    };
    const navigation = {
      getParam() {
        return [];
      }
    };
    const { baseElement } = renderWithRedux(<DictionaryTrainingScreen navigation={navigation} />, initialState);

    expect(baseElement).toBeTruthy();
  });

  it('Card word is successful if have words for training', () => {
    const initialState = {
      data: {
        dictionaries: [
          {
            id: 11,
            name: 'Hellooo',
            words: []
          },
          {
            id: 31,
            name: 'Ghehhll',
            words: [
              {
                id: 51,
                en: {
                  name: '31',
                  count: 0
                },
                ru: {
                  name: 'Привет',
                  count: 0
                }
              }
            ]
          }
        ]
      }
    };
    const navigation = {
      getParam() {
        return [11, 31];
      }
    };
    const { queryByTestId } = renderWithRedux(<DictionaryTrainingScreen navigation={navigation} />, initialState);

    expect(queryByTestId('cart-word')).toBeTruthy();
  });

  it('Not word is successful if have not words for training', () => {
    const initialState = {
      data: {
        dictionaries: [
          {
            id: 31,
            name: "'Ghehhll'",
            words: [
              {
                id: 51,
                en: {
                  name: '31',
                  count: SETTINGS.attempt + 10
                },
                ru: {
                  name: 'Привет',
                  count: SETTINGS.attempt + 10
                }
              }
            ]
          }
        ]
      }
    };
    const navigation = {
      getParam() {
        return [31];
      }
    };
    const { queryByTestId } = renderWithRedux(<DictionaryTrainingScreen navigation={navigation} />, initialState);

    expect(queryByTestId('not-word')).toBeTruthy();
  });

  it('Not word is successful if word attempt more then SETTINGS.ATTEMPT', () => {
    const initialState = {
      data: {
        dictionaries: []
      }
    };
    const navigation = {
      getParam() {
        return [11, 31];
      }
    };
    const { queryByTestId } = renderWithRedux(<DictionaryTrainingScreen navigation={navigation} />, initialState);

    expect(queryByTestId('not-word')).toBeTruthy();
  });
});
