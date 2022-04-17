export { SETTINGS } from './settings';
export { Colors } from './colors';

// Screens
export enum SCREENS {
  SIGN_IN = 'SignIn',
  SIGN_UP = 'SignUp',
  HOME = 'Home',
  DICTIONARIES = 'Dictionaries',
  PROFILE = 'Profile',
  DICTIONARY_TRAINING = 'DictionaryTraining',
  DICTIONARIES_LIST = 'DictionariesList',
  CREATE_DICTIONARY = 'CreateDictionary',
  PREVIEW_DICTIONARY = 'PreviewDictionary',
  SETTINGS_DICTIONARY = 'SettingsDictionary',
}

// Tokens + LS
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const EXPIRE_TOKEN = 'EXPIRE_TOKEN';
export const USER = 'USER';

// LS
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
