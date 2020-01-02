import React from 'react';
import { fireEvent, wait } from '@testing-library/react-native';
import { toBeDisabled, toHaveProp } from '@testing-library/jest-native';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { renderWithRedux } from '@mocks';
import { SignInScreen } from './signin';
import axios from 'axios';
import {toSignIn} from './effects';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

expect.extend({ toBeDisabled, toHaveProp });
//
// describe('SignIn Screen Render', () => {
//   it('Render is successful', () => {
//     const { baseElement } = renderWithRedux(<SignInScreen />);
//
//     expect(baseElement).toBeTruthy();
//   });
//
//   it('Text enter in login input', async () => {
//     const { queryByTestId } = renderWithRedux(<SignInScreen />);
//     const text = 'Логин';
//     const input = queryByTestId('login');
//
//     fireEvent.changeText(input, text);
//
//     await wait(() => {
//       expect(queryByTestId('login').props.value).toBe(text);
//     });
//   });
//
//   it('Text enter in password input', async () => {
//     const { queryByTestId } = renderWithRedux(<SignInScreen />);
//     const text = 'Пароль';
//     const input = queryByTestId('password');
//
//     fireEvent.changeText(input, text);
//
//     await wait(() => {
//       expect(queryByTestId('password').props.value).toBe(text);
//     });
//   });
//
//   it('Button submit is disabled if login and password fields is empty', async () => {
//     const { queryByTestId } = renderWithRedux(<SignInScreen />);
//     const login = queryByTestId('login');
//     const password = queryByTestId('password');
//
//     fireEvent.changeText(login, '');
//     fireEvent.changeText(password, '');
//
//     await wait(() => {
//       expect(queryByTestId('submit')).toBeDisabled();
//     });
//   });
//
//   it('Button submit is disabled if login field empty', async () => {
//     const { queryByTestId } = renderWithRedux(<SignInScreen />);
//     const login = queryByTestId('login');
//     const password = queryByTestId('password');
//
//     fireEvent.changeText(login, '');
//     fireEvent.changeText(password, 'password');
//
//     await wait(() => {
//       expect(queryByTestId('submit')).toBeDisabled();
//     });
//   });
//
//   it('Button submit is disabled if password field empty', async () => {
//     const { queryByTestId } = renderWithRedux(<SignInScreen />);
//     const login = queryByTestId('login');
//     const password = queryByTestId('password');
//
//     fireEvent.changeText(login, 'login');
//     fireEvent.changeText(password, '');
//
//     await wait(() => {
//       expect(queryByTestId('submit')).toBeDisabled();
//     });
//   });
//
//   it('Button submit not disabled if login and password fields not empty', async () => {
//     const { queryByTestId } = renderWithRedux(<SignInScreen />);
//     const login = queryByTestId('login');
//     const password = queryByTestId('password');
//
//     fireEvent.changeText(login, 'login');
//     fireEvent.changeText(password, 'password');
//
//     await wait(() => {
//       expect(queryByTestId('submit')).not.toBeDisabled();
//     });
//   });
// });

describe('SignIn Screen Effects', () => {
  it('toSignIn', async () => {
    const store = mockStore();
    const request = new MockAdapter(axios);


    await store.dispatch(toSignIn());


    console.log(store.getActions());
    //expect(store.getActions()).toEqual(expectedActions);
  })
})
