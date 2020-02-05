// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';
// import { toSignUp } from '../../signup/effects';
// import thunk from 'redux-thunk';
// import configureMockStore from 'redux-mock-store';
// import { SET_PROCESSING, SET_USER, SET_AUTH, SET_NOTIFICATION, SETTINGS, ERROR } from '@constants';
//
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
// const props = {
//   navigation: { navigate: () => {} }
// };
//
//
describe('DictionariesScreen Effects', () => {
  it.todo('createDictionary')
  it.todo('saveWord')
  // it('createDictionary', async () => {
  //   const body = { login: 'test', password: 'test' };
  //   const data = {
  //     user: {
  //       id: 1
  //     },
  //     tokens: {
  //       access_token: '123',
  //       refresh_token: '123',
  //       expire: 1577990198
  //     }
  //   };
  //   const expectedActions = [
  //     {
  //       type: SET_PROCESSING,
  //       payload: true
  //     },
  //     {
  //       type: SET_USER,
  //       payload: { id: data.user.id }
  //     },
  //     {
  //       type: SET_AUTH,
  //       payload: true
  //     },
  //     {
  //       type: SET_PROCESSING,
  //       payload: false
  //     }
  //   ];
  //   const store = mockStore();
  //   const request = new MockAdapter(axios);
  //
  //   mockFormData();
  //   request.onPost(`${SETTINGS.host}/api/signup`).reply(200, {
  //     data
  //   });
  //
  //   await store.dispatch(toSignUp(props.navigation, body));
  //
  //   expect(store.getActions()).toEqual(expectedActions);
  });

  // it('toSignUp error setNotification', async () => {
  //   const store = mockStore();
  //   const request = new MockAdapter(axios);
  //   const error = {
  //     message: 'error'
  //   };
  //
  //   const expectedActions = [
  //     {
  //       type: SET_PROCESSING,
  //       payload: true
  //     },
  //     {
  //       type: SET_NOTIFICATION,
  //       payload: {
  //         type: ERROR,
  //         text: error.message
  //       }
  //     },
  //     {
  //       type: SET_PROCESSING,
  //       payload: false
  //     }
  //   ];
  //
  //   mockFormData();
  //   request.onPost(`${SETTINGS.host}/api/signup`).reply(500, { error });
  //
  //   await store.dispatch(toSignUp());
  //   expect(store.getActions()).toEqual(expectedActions);
  // });
//});
