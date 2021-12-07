import { REQUEST_PARAM } from './interfaces';

export enum API_LIST {
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  LOGIN = 'LOGIN',
  MAIN_DATA = 'MAIN_DATA',
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
  [API_LIST.MAIN_DATA]: {
    url: '/screens/home',
    method: 'GET',
  }
};
