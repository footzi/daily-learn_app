import React from 'react';
import { renderWithRedux } from '@mocks';
import { DictionariesScreen } from '../dictionaries';
import { toHaveTextContent } from '@testing-library/jest-native';

expect.extend({ toHaveTextContent });

describe('Main DictionariesScreen', () => {
  it('Render is successful', () => {
    const initialState = {
      data: {
        dictionaries: []
      }
    };
    const { baseElement } = renderWithRedux(<DictionariesScreen />, initialState);

    expect(baseElement).toBeTruthy();
  });

  it('Empty title if dictionaries array length 0', () => {
    const initialState = {
      data: {
        dictionaries: []
      }
    };
    const { queryByTestId } = renderWithRedux(<DictionariesScreen />, initialState);

    expect(queryByTestId('empty-title')).toBeTruthy();
  });

  it('Not list if dictionaries array length 0', () => {
    const initialState = {
      data: {
        dictionaries: []
      }
    };
    const { queryByTestId } = renderWithRedux(<DictionariesScreen />, initialState);

    expect(queryByTestId('list')).toBeFalsy();
  });

  it('Create button text is "Создать" if dictionaries array length 0', () => {
    const initialState = {
      data: {
        dictionaries: []
      }
    };
    const { queryByTestId } = renderWithRedux(<DictionariesScreen />, initialState);

    expect(queryByTestId('create-button')).toHaveTextContent('Создать');
  });

  it('Not empty title if dictionaries exist', () => {
    const initialState = {
      data: {
        dictionaries: [
          {
            id: 11,
            name: "'Hellooo'",
            words: []
          },
          {
            id: 31,
            name: "'Ghehhll'",
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
    const { queryByTestId } = renderWithRedux(<DictionariesScreen />, initialState);

    expect(queryByTestId('empty-title')).toBeFalsy();
  });

  it('Not empty title if dictionaries exist', () => {
    const initialState = {
      data: {
        dictionaries: [
          {
            id: 11,
            name: "'Hellooo'",
            words: []
          }
        ]
      }
    };
    const { queryByTestId } = renderWithRedux(<DictionariesScreen />, initialState);

    expect(queryByTestId('list')).toBeTruthy();
  });

  it('Create button text is "Добавить" if dictionaries exist', () => {
    const initialState = {
      data: {
        dictionaries: [
          {
            id: 11,
            name: "'Hellooo'",
            words: []
          }
        ]
      }
    };
    const { queryByTestId } = renderWithRedux(<DictionariesScreen />, initialState);

    expect(queryByTestId('create-button')).toHaveTextContent('Добавить');
  });
});
