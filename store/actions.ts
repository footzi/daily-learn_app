import {
  SET_NOTIFICATION,
  SET_USER,
  SET_IS_AUTH,
  SET_PROFILE,
  SET_DICTIONARIES,
  SET_LOADING_ITEM,
  REMOVE_LOADING_ITEM,
} from '@constants';

import {
  SetIsAuthResult,
  SetUserPayload,
  SetUserResult,
  SetDictionariesPayload,
  SetDictionariesResult,
  SetProfilePayload,
  SetProfileResult,
  SetNotificationPayload,
  SetNotificationResult,
  SetLoadingPayload,
  SetLoadingResult,
} from './interfaces';

export const setIsAuth = (): SetIsAuthResult => ({ type: SET_IS_AUTH, payload: true });
export const removeIsAuth = (): SetIsAuthResult => ({ type: SET_IS_AUTH, payload: false });

export const setUser = (payload: SetUserPayload): SetUserResult => ({ type: SET_USER, payload });
export const removeUser = (): SetUserResult => ({ type: SET_USER, payload: null });

export const setDictionaries = (payload: SetDictionariesPayload): SetDictionariesResult => ({
  type: SET_DICTIONARIES,
  payload,
});

export const setProfile = (payload: SetProfilePayload): SetProfileResult => ({
  type: SET_PROFILE,
  payload,
});

export const setNotification = (payload: SetNotificationPayload): SetNotificationResult => ({
  type: SET_NOTIFICATION,
  payload,
});
export const clearNotification = (): SetNotificationResult => ({
  type: SET_NOTIFICATION,
  payload: {
    type: '',
    text: '',
  },
});

export const startLoading = (item: SetLoadingPayload): SetLoadingResult => ({ type: SET_LOADING_ITEM, payload: item });
export const endLoading = (item: SetLoadingPayload): SetLoadingResult => ({ type: REMOVE_LOADING_ITEM, payload: item });
