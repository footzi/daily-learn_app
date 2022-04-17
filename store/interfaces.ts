import { Dictionaries, Maybe, Notification, User } from '@interfaces';
import { NOTIFICATION_TYPES } from '@constants';

export interface State {
  user: Maybe<User>;
  dictionaries: Dictionaries;
  notification: Notification;
  refetchMainData: () => void;
}

export interface AppContextType {
  state: State;
  dispatch: React.Dispatch<ACTION<any>>;
}

export enum ACTIONS {
  SET_USER = 'SET_USER',
  SET_DICTIONARIES = 'SET_DICTIONARIES',
  SET_NOTIFICATION = 'SET_NOTIFICATION',
  SET_REFETCH_MAIN_DATA = 'SET_REFETCH_MAIN_DATA',
}

export interface ACTION<T> {
  type: ACTIONS;
  payload: T;
}

export interface SetNotificationPayload {
  type: NOTIFICATION_TYPES | '';
  text: string;
}
