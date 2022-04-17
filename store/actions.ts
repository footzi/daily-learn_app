import { ACTION, ACTIONS, SetNotificationPayload } from './interfaces';
import { NOTIFICATION_TYPES } from '@constants';
import { Maybe, User } from '@interfaces';

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

// todo приверсти к одному интерфейсу
export const removeUser = (): ACTION<Maybe<User>> => ({ type: ACTIONS.SET_USER, payload: null });
