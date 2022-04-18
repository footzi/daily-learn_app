import { NOTIFICATION_TYPES } from '@constants';
import { Dictionaries, Maybe, User } from '@interfaces';

import { ACTION, ACTIONS, SetNotificationPayload } from './interfaces';

export const setErrorNotification = (text: string): ACTION<SetNotificationPayload> => ({
  type: ACTIONS.SET_NOTIFICATION,
  payload: {
    type: NOTIFICATION_TYPES.ERROR,
    text,
  },
});

export const clearNotification = (): ACTION<SetNotificationPayload> => ({
  type: ACTIONS.SET_NOTIFICATION,
  payload: {
    type: null,
    text: '',
  },
});

export const setUser = (user: User): ACTION<User> => ({ type: ACTIONS.SET_USER, payload: user });
export const removeUser = (): ACTION<Maybe<User>> => ({ type: ACTIONS.SET_USER, payload: null });

export const setDictionaries = (dictionaries: Dictionaries): ACTION<Dictionaries> => ({
  type: ACTIONS.SET_DICTIONARIES,
  payload: dictionaries,
});

export const setRefetchMainData = (refetch: () => void): ACTION<() => void> => ({
  type: ACTIONS.SET_REFETCH_MAIN_DATA,
  payload: refetch,
});
