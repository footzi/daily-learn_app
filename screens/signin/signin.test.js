import React from 'react';
import axios from 'axios';
import { fireEvent, wait } from '@testing-library/react-native';
import { toBeDisabled, toHaveProp } from '@testing-library/jest-native';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { mockFormData, renderWithRedux } from '@mocks';
import { SET_PROCESSING, SET_USER, SET_AUTH, SET_NOTIFICATION, SETTINGS, ERROR } from '@constants';
import { SignInScreen } from './signin';
import { toSignIn } from './effects';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const props = {
  navigation: { navigate: () => {} }
};

expect.extend({ toBeDisabled, toHaveProp });

describe('SignIn Screen - Render', () => {
  it('Render is successful', () => {
    const { baseElement } = renderWithRedux(<SignInScreen />);

    expect(baseElement).toBeTruthy();
  });

  it('Text enter in login input', async () => {
    const { getByPlaceholderText } = renderWithRedux(<SignInScreen />);
    const text = 'Логин';
    const input = getByPlaceholderText('Логин');

    fireEvent.changeText(input, text);

    await wait(() => {
      expect(getByPlaceholderText('Логин').props.value).toBe(text);
    });
  });

  it('Text enter in password input', async () => {
    const { getByPlaceholderText } = renderWithRedux(<SignInScreen />);
    const text = 'Пароль';
    const input = getByPlaceholderText('Пароль');

    fireEvent.changeText(input, text);

    await wait(() => {
      expect(getByPlaceholderText('Пароль').props.value).toBe(text);
    });
  });

  it('Button submit is disabled if login and password fields is empty', async () => {
    const { getByPlaceholderText, queryByTestId } = renderWithRedux(<SignInScreen />);
    const login = getByPlaceholderText('Логин');
    const password = getByPlaceholderText('Пароль');

    fireEvent.changeText(login, '');
    fireEvent.changeText(password, '');

    await wait(() => {
      expect(queryByTestId('submit')).toBeDisabled();
    });
  });

  it('Button submit is disabled if login field empty', async () => {
    const { getByPlaceholderText, queryByTestId } = renderWithRedux(<SignInScreen />);
    const login = getByPlaceholderText('Логин');
    const password = getByPlaceholderText('Пароль');

    fireEvent.changeText(login, '');
    fireEvent.changeText(password, 'password');

    await wait(() => {
      expect(queryByTestId('submit')).toBeDisabled();
    });
  });

  it('Button submit is disabled if password field empty', async () => {
    const { getByPlaceholderText, queryByTestId } = renderWithRedux(<SignInScreen />);
    const login = getByPlaceholderText('Логин');
    const password = getByPlaceholderText('Пароль');

    fireEvent.changeText(login, 'login');
    fireEvent.changeText(password, '');

    await wait(() => {
      expect(queryByTestId('submit')).toBeDisabled();
    });
  });

  it('Button submit not disabled if login and password fields not empty', async () => {
    const { getByPlaceholderText, queryByTestId } = renderWithRedux(<SignInScreen />);
    const login = getByPlaceholderText('Логин');
    const password = getByPlaceholderText('Пароль');

    fireEvent.changeText(login, 'login');
    fireEvent.changeText(password, 'password');

    await wait(() => {
      expect(queryByTestId('submit')).not.toBeDisabled();
    });
  });
});

describe('SignIn Screen - Effects', () => {
  it('toSignIn success setUser setAuth', async () => {
    const body = { login: 'test', password: 'test' };
    const data = {
      user: {
        id: 1
      },
      tokens: {
        access_token: '123',
        refresh_token: '123',
        expire: 1577990198
      }
    };
    const expectedActions = [
      {
        type: SET_PROCESSING,
        payload: true
      },
      {
        type: SET_USER,
        payload: { id: data.user.id }
      },
      {
        type: SET_AUTH,
        payload: true
      },
      {
        type: SET_PROCESSING,
        payload: false
      }
    ];
    const store = mockStore();
    const request = new MockAdapter(axios);

    mockFormData();
    request.onPost(`${SETTINGS.host}/api/signin`).reply(200, {
      data
    });

    await store.dispatch(toSignIn(props.navigation, body));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('toSignIn error setNotification', async () => {
    const store = mockStore();
    const request = new MockAdapter(axios);
    const error = {
      message: 'Request failed with status code 500'
    };

    const expectedActions = [
      {
        type: SET_PROCESSING,
        payload: true
      },
      {
        type: SET_NOTIFICATION,
        payload: {
          type: ERROR,
          text: error.message
        }
      },
      {
        type: SET_PROCESSING,
        payload: false
      }
    ];

    mockFormData();
    request.onPost(`${SETTINGS.host}/api/signin`).reply(500);

    await store.dispatch(toSignIn());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
