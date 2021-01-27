import {
  SET_NOTIFICATION,
  SET_USER,
  SET_IS_AUTH,
  SET_PROFILE,
  SET_DICTIONARIES,
  SET_LOADING_ITEM,
  REMOVE_LOADING_ITEM,
  LOADING_ITEMS,
} from '@constants';

import { User, Dictionaries, Profile, Notification } from '@interfaces';

export interface InitStateInterface {
  isAuth: boolean;
  user: User | null;
  dictionaries?: Dictionaries;
  profile?: Profile;
  loading?: Record<SetLoadingPayload, boolean> | null;
  notification?: Notification;
}

export interface SetIsAuthResult {
  type: typeof SET_IS_AUTH;
  payload: boolean;
}

export type SetUserPayload = User | null;
export interface SetUserResult {
  type: typeof SET_USER;
  payload: SetUserPayload;
}

export type SetDictionariesPayload = Dictionaries;
export interface SetDictionariesResult {
  type: typeof SET_DICTIONARIES;
  payload: SetDictionariesPayload;
}

export type SetProfilePayload = Profile;
export interface SetProfileResult {
  type: typeof SET_PROFILE;
  payload: SetProfilePayload;
}

export type SetNotificationPayload = Notification;
export interface SetNotificationResult {
  type: typeof SET_NOTIFICATION;
  payload: SetNotificationPayload;
}

export type SetLoadingPayload = LOADING_ITEMS.FIRST | LOADING_ITEMS.UPDATE | LOADING_ITEMS.INNER;
export interface SetLoadingResult {
  type: typeof SET_LOADING_ITEM | typeof REMOVE_LOADING_ITEM;
  payload: SetLoadingPayload;
}

export type AppActions =
  | SetIsAuthResult
  | SetUserResult
  | SetDictionariesResult
  | SetProfileResult
  | SetNotificationResult
  | SetLoadingResult;
