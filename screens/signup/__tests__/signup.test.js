import React from 'react';
import axios from 'axios';
import { fireEvent, wait } from '@testing-library/react-native';
import { toBeDisabled, toHaveProp } from '@testing-library/jest-native';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { mockFormData, renderWithRedux } from '@mocks';
import { SET_PROCESSING, SET_USER, SET_IS_AUTH, SET_NOTIFICATION, SETTINGS, ERROR } from '@constants';
import { SignUpScreen } from '../signup';
import { toSignUp } from '../effects';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const props = {
  navigation: { navigate: () => {} },
};

expect.extend({ toBeDisabled, toHaveProp });

describe('SignUp Screen - Render', () => {
  it('Render is successful', () => {
    const { baseElement } = renderWithRedux(<SignUpScreen />);

    expect(baseElement).toBeTruthy();
  });

  it('Text enter in login input', async () => {
    const { getByPlaceholderText } = renderWithRedux(<SignUpScreen />);
    const text = 'Логин';
    const input = getByPlaceholderText('Логин *');

    fireEvent.changeText(input, text);

    await wait(() => {
      expect(getByPlaceholderText('Логин *').props.value).toBe(text);
    });
  });

  it('Text enter in email input', async () => {
    const { getByPlaceholderText } = renderWithRedux(<SignUpScreen />);
    const text = 'Е-mail';
    const input = getByPlaceholderText('Е-mail');

    fireEvent.changeText(input, text);

    await wait(() => {
      expect(getByPlaceholderText('Е-mail').props.value).toBe(text);
    });
  });

  it('Text enter in password input', async () => {
    const { getByPlaceholderText } = renderWithRedux(<SignUpScreen />);
    const text = 'Пароль';
    const input = getByPlaceholderText('Пароль *');

    fireEvent.changeText(input, text);

    await wait(() => {
      expect(getByPlaceholderText('Пароль *').props.value).toBe(text);
    });
  });

  it('Text enter in confirm password input', async () => {
    const { getByPlaceholderText } = renderWithRedux(<SignUpScreen />);
    const text = 'Подтвердите Пароль';
    const input = getByPlaceholderText('Подтвердите пароль *');

    fireEvent.changeText(input, text);

    await wait(() => {
      expect(getByPlaceholderText('Подтвердите пароль *').props.value).toBe(text);
    });
  });

  it('Button submit is disabled if login and passwords fields is empty', async () => {
    const { getByPlaceholderText, queryByTestId } = renderWithRedux(<SignUpScreen />);
    const login = getByPlaceholderText('Логин *');
    const password = getByPlaceholderText('Пароль *');
    const password2 = getByPlaceholderText('Подтвердите пароль *');

    fireEvent.changeText(login, '');
    fireEvent.changeText(password, '');
    fireEvent.changeText(password2, '');

    await wait(() => {
      expect(queryByTestId('submit')).toBeDisabled();
    });
  });

  it('Button submit is disabled if login field empty', async () => {
    const { queryByTestId, getByPlaceholderText } = renderWithRedux(<SignUpScreen />);
    const login = getByPlaceholderText('Логин *');
    const password = getByPlaceholderText('Пароль *');
    const password2 = getByPlaceholderText('Подтвердите пароль *');

    fireEvent.changeText(login, '');
    fireEvent.changeText(password, 'password');
    fireEvent.changeText(password2, 'password');

    await wait(() => {
      expect(queryByTestId('submit')).toBeDisabled();
    });
  });

  it('Button submit is disabled if password-first field empty', async () => {
    const { getByPlaceholderText, queryByTestId } = renderWithRedux(<SignUpScreen />);
    const login = getByPlaceholderText('Логин *');
    const password = getByPlaceholderText('Пароль *');
    const password2 = getByPlaceholderText('Подтвердите пароль *');

    fireEvent.changeText(login, 'login');
    fireEvent.changeText(password, '');
    fireEvent.changeText(password2, 'password');

    await wait(() => {
      expect(queryByTestId('submit')).toBeDisabled();
    });
  });

  it('Button submit is disabled if password-second field empty', async () => {
    const { getByPlaceholderText, queryByTestId } = renderWithRedux(<SignUpScreen />);
    const login = getByPlaceholderText('Логин *');
    const password = getByPlaceholderText('Пароль *');
    const password2 = getByPlaceholderText('Подтвердите пароль *');

    fireEvent.changeText(login, 'login');
    fireEvent.changeText(password, 'password');
    fireEvent.changeText(password2, '');

    await wait(() => {
      expect(queryByTestId('submit')).toBeDisabled();
    });
  });

  it('Button submit is disabled if passwords fields value not equal', async () => {
    const { getByPlaceholderText, queryByTestId } = renderWithRedux(<SignUpScreen />);
    const login = getByPlaceholderText('Логин *');
    const password = getByPlaceholderText('Пароль *');
    const password2 = getByPlaceholderText('Подтвердите пароль *');

    fireEvent.changeText(login, 'login');
    fireEvent.changeText(password, 'password');
    fireEvent.changeText(password2, 'password1234');

    await wait(() => {
      expect(queryByTestId('submit')).toBeDisabled();
    });
  });

  it('Button submit not disabled if login and password fields not empty and password is equal', async () => {
    const { queryByTestId, getByPlaceholderText } = renderWithRedux(<SignUpScreen />);
    const login = getByPlaceholderText('Логин *');
    const password = getByPlaceholderText('Пароль *');
    const password2 = getByPlaceholderText('Подтвердите пароль *');

    fireEvent.changeText(login, 'login');
    fireEvent.changeText(password, 'password');
    fireEvent.changeText(password2, 'password');

    await wait(() => {
      expect(queryByTestId('submit')).not.toBeDisabled();
    });
  });
});

describe('SignUp Screen - Effects', () => {
  it('toSignUp success setUser setIsAuth', async () => {
    const body = { login: 'test', password: 'test' };
    const data = {
      user: {
        id: 1,
      },
      tokens: {
        access_token: '123',
        refresh_token: '123',
        expire: 1577990198,
      },
    };
    const expectedActions = [
      {
        type: SET_PROCESSING,
        payload: true,
      },
      {
        type: SET_USER,
        payload: { id: data.user.id },
      },
      {
        type: SET_IS_AUTH,
        payload: true,
      },
      {
        type: SET_PROCESSING,
        payload: false,
      },
    ];
    const store = mockStore();
    const request = new MockAdapter(axios);

    mockFormData();
    request.onPost(`${SETTINGS.host}/api/signup`).reply(200, {
      data,
    });

    await store.dispatch(toSignUp(props.navigation, body));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('toSignUp error setNotification', async () => {
    const store = mockStore();
    const request = new MockAdapter(axios);
    const error = {
      message: 'Request failed with status code 500',
    };

    const expectedActions = [
      {
        type: SET_PROCESSING,
        payload: true,
      },
      {
        type: SET_NOTIFICATION,
        payload: {
          type: ERROR,
          text: error.message,
        },
      },
      {
        type: SET_PROCESSING,
        payload: false,
      },
    ];

    mockFormData();
    request.onPost(`${SETTINGS.host}/api/signup`).reply(500);

    await store.dispatch(toSignUp());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
