// // Settings
// export const SETTINGS = {
//   attempt: 5,
//   host: 'https://daily-learn-backend.herokuapp.com' // 'http://192.168.0.100:8080' https://daily-learn-backend.herokuapp.com
// };

export { SETTINGS } from './settings';
export { Colors } from './Colors';

// Screens
export const SCREENS = {
  DICTIONARY_TRAINING: 'DictionaryTraining',
  CREATE_DICTIONARY: 'CreateDictionary',
  PREVIEW_DICTIONARY: 'PreviewDictionary',
  SETTINGS_DICTIONARY: 'SettingsDictionary'
};

// Navigation Params
export const NAVIGATION_PARAMS = {
  preview_dictionary: 'preview_dictionary'
};

// Actions
export const SET_USER = 'SET_USER';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const SET_PROCESSING = 'SET_PROCESSING';
export const SET_AUTH = 'SET_AUTH';
export const SET_DATA = 'SET_DATA';
export const SET_HOME_SCREEN = 'SET_HOME_SCREEN';
export const SET_DICTINARY_WORDS = 'SET_DICTINARY_WORDS';

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
