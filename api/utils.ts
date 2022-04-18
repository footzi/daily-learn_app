import { SETTINGS, TOKENS_LS } from '@constants';
import { Tokens } from '@interfaces';
import { LocalStorage } from '@libs';

import { API_LIST, REQUEST_PARAMS } from './constants';
import { REQUEST_PARAM } from './interfaces';

export const getRequestConfig = (api: API_LIST): REQUEST_PARAM => {
  const config = REQUEST_PARAMS[api];
  const url = `${SETTINGS.host}${config.url}`;

  return {
    url,
    method: config.method,
  };
};

export const setTokens = async (tokens: Tokens) => {
  if (tokens) {
    await LocalStorage.set(TOKENS_LS, tokens);
  }
};
