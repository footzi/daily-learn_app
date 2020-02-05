import axios from 'axios';
import { createFormData, getToken, checkAccessToken } from './helpers';
import { LocalStorage } from '@libs';
import { actions, store } from '@store';
import { ERROR, TOKENS_LS, SETTINGS } from '@constants';

export const request = (method = 'get', url, body) => {
  const data = createFormData(body);

  return axios({
    method,
    url: `${SETTINGS.host}${url}`,
    data,
    withCredentials: true
  });
};

export const requestWithToken = async (method = 'get', url, body) => {
  const isValidAccessToken = await checkAccessToken();

  if (!isValidAccessToken) {
    await refreshTokens();
  }

  const token = await getToken('access');
  const headers = { Authorization: token };
  const data = body ? createFormData(body) : '';

  try {
    return await axios({
      method,
      url: `${SETTINGS.host}${url}`,
      headers,
      data
    });
  } catch (err) {
    const { error } = err.response.data;
    throw error;
  }
};

const refreshTokens = async () => {
  const token = await getToken('refresh');
  const headers = { Authorization: token };

  try {
    const response = await axios({
      method: 'post',
      url: `${SETTINGS.host}/api/refresh`,
      headers
    });

    const { data } = response.data;
    const { tokens } = data;

    LocalStorage.set(TOKENS_LS, tokens);
  } catch (err) {
    const { error } = err.response.data;

    LocalStorage.remove(TOKENS_LS);

    store.dispatch(actions.setNotification({ type: ERROR, text: error.message }));
    store.dispatch(actions.removeUser());
    store.dispatch(actions.removeAuth());
  }
};
