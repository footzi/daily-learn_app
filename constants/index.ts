export { SETTINGS } from './settings';
export { Colors } from './Colors';
export { NewColors } from './Colors';

// Screens
export const SCREENS = {
  HOME: 'Home',
  DICTIONARIES: 'Dictionaries',
  PROFILE: 'Profile',
  DICTIONARY_TRAINING: 'DictionaryTraining',
  DICTIONARIES_LIST: 'DictionariesList',
  CREATE_DICTIONARY: 'CreateDictionary',
  PREVIEW_DICTIONARY: 'PreviewDictionary',
  SETTINGS_DICTIONARY: 'SettingsDictionary',
};

// Loading Items
export const LOADING_ITEMS = {
  FIRST: 'FIRST',
  UPDATE: 'UPDATE',
  INNER: 'INNER',
};

// Actions
export const SET_USER = 'SET_USER';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const SET_IS_AUTH = 'SET_IS_AUTH';
export const SET_DATA = 'SET_DATA';
export const SET_HOME_SCREEN = 'SET_HOME_SCREEN';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_DICTIONARIES = 'SET_DICTIONARIES';
export const SET_LOADING_ITEM = 'SET_LOADING_ITEM';
export const REMOVE_LOADING_ITEM = 'REMOVE_LOADING_ITEM';

// Notification
export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';

// Tokens + LS
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const EXPIRE_TOKEN = 'EXPIRE_TOKEN';
export const USER = 'USER';

// LS
export const USER_LS = 'USER_LS';
export const TOKENS_LS = 'TOKENS_LS';

// ANIMATION
export const PAWS_DURATION = 900;

export const PREVIEW_SLIDE_MENU_DURATION = 200;

export const PREVIEW_SLIDE_MENU_LEFT = {
  0: {
    translateX: 30,
  },
  1: {
    translateX: 0,
  },
};

export const PREVIEW_SLIDE_MENU_RIGHT = {
  0: {
    translateX: 0,
  },
  1: {
    translateX: 30,
  },
};

export enum PREVIEW_FILTER_MODE {
  NONE = 'NONE',
  EN = 'EN',
  RU = 'RU',
}

export enum DICTIONARIES_EMPTY_MODE {
  PREVIEW = 'PREVIEW',
  LIST = 'LIST',
}

// NOTIFICATION
export enum NOTIFICATION_TYPES {
  ERROR = 'ERROR',
}

export const NOTIFICATION_AUTO_CLOSE_TIMEOUT = 3000;