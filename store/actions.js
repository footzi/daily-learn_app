import {
  SET_NOTIFICATION,
  SET_USER,
  SET_IS_AUTH,
  SET_PROFILE,
  SET_DICTIONARIES,
  SET_LOADING_ITEM,
  REMOVE_LOADING_ITEM,
} from '@constants';

export const setIsAuth = () => ({ type: SET_IS_AUTH, payload: true });
export const removeIsAuth = () => ({ type: SET_IS_AUTH, payload: false });

export const setUser = (payload) => ({ type: SET_USER, payload });
export const removeUser = () => ({ type: SET_USER, payload: null });

export const setDictionaries = (payload) => ({
  type: SET_DICTIONARIES,
  payload,
});

export const setProfile = (payload) => ({
  type: SET_PROFILE,
  payload,
});

export const setNotification = (payload) => ({ type: SET_NOTIFICATION, payload });
export const clearNotification = () => ({
  type: SET_NOTIFICATION,
  payload: {
    type: '',
    text: '',
  },
});

export const startLoading = (item) => ({ type: SET_LOADING_ITEM, payload: item });
export const endLoading = (item) => ({ type: REMOVE_LOADING_ITEM, payload: item });
