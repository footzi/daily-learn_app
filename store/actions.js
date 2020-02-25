import { SET_NOTIFICATION, SET_PROCESSING, SET_USER, SET_AUTH, SET_DATA, SET_HOME_SCREEN } from '@constants';

export const actions = {
  setAuth: () => {
    return { type: SET_AUTH, payload: true };
  },
  removeAuth: () => {
    return { type: SET_AUTH, payload: false };
  },

  setUser: payload => {
    return { type: SET_USER, payload };
  },
  removeUser: () => {
    return { type: SET_USER, payload: null };
  },

  setData: payload => ({ type: SET_DATA, payload }),
  clearData: () => ({ type: SET_DATA, payload: null }),

  setHomeScreen: payload => ({
    type: SET_HOME_SCREEN,
    payload: { dictionaries: payload.dictionaries }
  }),

  setNotification: payload => ({ type: SET_NOTIFICATION, payload }),
  clearNotification: () => ({
    type: SET_NOTIFICATION,
    payload: {
      type: '',
      text: ''
    }
  }),

  setProcessing: () => ({ type: SET_PROCESSING, payload: true }),
  removeProcessing: () => ({ type: SET_PROCESSING, payload: false }),

  setTest: payload => ({ type: 'SET_TEST', payload })
};
