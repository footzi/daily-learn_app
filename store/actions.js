import { SET_NOTIFICATION, SET_PROCESSING, SET_USER, SET_IS_AUTH, SET_PROFILE, SET_DICTIONARIES } from '@constants';
import { SET_IS_LOADED } from '../constants';

export const actions = {
  setIsLoaded: () => {
    return { type: SET_IS_LOADED, payload: true };
  },
  removeIsLoaded: () => {
    return { type: SET_IS_LOADED, payload: false };
  },

  setIsAuth: () => {
    return { type: SET_IS_AUTH, payload: true };
  },
  removeIsAuth: () => {
    return { type: SET_IS_AUTH, payload: false };
  },

  setUser: (payload) => {
    return { type: SET_USER, payload };
  },
  removeUser: () => {
    return { type: SET_USER, payload: null };
  },

  setDictionaries: (payload) => ({
    type: SET_DICTIONARIES,
    payload,
  }),

  setProfile: (payload) => ({
    type: SET_PROFILE,
    payload,
  }),

  setNotification: (payload) => ({ type: SET_NOTIFICATION, payload }),
  clearNotification: () => ({
    type: SET_NOTIFICATION,
    payload: {
      type: '',
      text: '',
    },
  }),

  setProcessing: () => ({ type: SET_PROCESSING, payload: true }),
  removeProcessing: () => ({ type: SET_PROCESSING, payload: false }),
};
