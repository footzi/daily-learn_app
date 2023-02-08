import { REQUEST_PARAM } from './interfaces';

export enum API_LIST {
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
  LOGOUT = 'LOGOUT',
  MAIN_DATA = 'MAIN_DATA',
  CREATE_DICTIONARY = 'CREATE_DICTIONARY',
  DELETE_DICTIONARY = 'DELETE_DICTIONARY',
  CREATE_WORD = 'CREATE_WORD',
  DELETE_WORD = 'DELETE_WORD',
  CHANGE_COUNT_WORD = 'CHANGE_COUNT_WORD',
  CHANGE_PROFILE = 'CHANGE_PROFILE',
}

export const REQUEST_PARAMS: {
  [key in keyof typeof API_LIST]: REQUEST_PARAM;
} = {
  [API_LIST.REFRESH_TOKEN]: {
    url: '/api/refresh',
    method: 'POST',
  },
  [API_LIST.LOGIN]: {
    url: '/api/signin',
    method: 'POST',
  },
  [API_LIST.SIGN_UP]: {
    url: '/api/signup',
    method: 'POST',
  },
  [API_LIST.LOGOUT]: {
    url: '/api/signout',
    method: 'POST',
  },
  [API_LIST.MAIN_DATA]: {
    url: '/screens/home',
    method: 'GET',
  },
  [API_LIST.CREATE_DICTIONARY]: {
    url: '/api/dictionary/create',
    method: 'POST',
  },
  [API_LIST.DELETE_DICTIONARY]: {
    url: '/api/dictionary/delete',
    method: 'DELETE',
  },
  [API_LIST.CREATE_WORD]: {
    url: '/api/words/create',
    method: 'POST',
  },
  [API_LIST.DELETE_WORD]: {
    url: '/api/words/delete',
    method: 'DELETE',
  },
  [API_LIST.CHANGE_COUNT_WORD]: {
    url: '/api/words/changeCount',
    method: 'PUT',
  },
  [API_LIST.CHANGE_PROFILE]: {
    url: '/api/user/change',
    method: 'PUT',
  },
};
