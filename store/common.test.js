import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { SET_DATA, SET_NOTIFICATION, SETTINGS, ERROR } from '@constants';
import { mockFormData, mockRefreshToken } from '@mocks';
import * as effects from './common-effects';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Common effects', () => {
  it('getMainData success setData', async () => {
    const data = {
      dictionaries: [
        { id: 11, name: "'Hellooo'", words: [] },
        { id: 21, name: "'Ghehh'", words: [] },
        {
          id: 31,
          name: "'Ghehhll'",
          words: [{ id: 51, en: { name: '31', count: 0 }, ru: { name: 'Привет', count: 0 } }]
        },
        { id: 41, name: '3232', words: [] },
        {
          id: 51,
          name: 'Новый словарь',
          words: [{ id: 61, en: { name: 'Слово 1', count: 0 }, ru: { name: 'Слово 1', count: 0 } }]
        },
        {
          id: 61,
          name: 'Новый словарь 2',
          words: [
            { id: 71, en: { name: 'Слово 2', count: 0 }, ru: { name: 'Слово 2', count: 0 } },
            { id: 81, en: { name: 'Слово 3', count: 3 }, ru: { name: 'Слово 3', count: 1 } },
            { id: 141, en: { name: 'Slovo', count: 0 }, ru: { name: 'Слово 3', count: 0 } }
          ]
        },
        { id: 141, name: 'Новый словарь 34', words: [] }
      ]
    };
    const expectedActions = [
      {
        type: SET_DATA,
        payload: data
      }
    ];
    const store = mockStore();
    const request = new MockAdapter(axios);

    mockFormData();
    mockRefreshToken(request);
    request.onGet(`${SETTINGS.host}/screens/home`).reply(200, {
      data
    });

    await store.dispatch(effects.getMainData());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('getMainData error setNotification', async () => {
    const store = mockStore();
    const request = new MockAdapter(axios);
    const error = {
      message: 'error'
    };

    const expectedActions = [
      {
        type: SET_NOTIFICATION,
        payload: {
          type: ERROR,
          text: error.message
        }
      }
    ];

    mockFormData();
    mockRefreshToken(request);

    request.onGet(`${SETTINGS.host}/screens/home`).reply(500, { error });

    await store.dispatch(effects.getMainData());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
