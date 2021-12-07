import axios, { AxiosResponse } from 'axios';
import { createFormData, getToken, checkAccessToken } from './helpers';
import { LocalStorage } from '@libs';
import { TOKENS_LS, SETTINGS } from '@constants';
// import * as actions from '@store';

let instance = null;

class Request {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  public(method = 'get', url, body): Promise<AxiosResponse> {
    const data = createFormData(body);

    // @ts-ignore
    return axios({
      method,
      url: `${SETTINGS.host}${url}`,
      data,
    });
  }

  async private(method = 'get', url, body?): Promise<AxiosResponse> {
    const isValidAccessToken = await checkAccessToken();

    if (!isValidAccessToken) {
      await this._refreshTokens();
    }

    const token = await getToken(false);
    const headers = { Authorization: token };
    const data = body ? createFormData(body) : '';

    // @ts-ignore
    return axios({
      method,
      url: `${SETTINGS.host}${url}`,
      headers,
      data,
    });
  }

  async _refreshTokens() {
    const token = await getToken(true);
    const headers = { Authorization: token };

    try {
      const response = await axios({
        method: 'post',
        url: `${SETTINGS.host}/api/refresh`,
        headers,
      });

      const { data } = response.data;
      const { tokens } = data;

      await LocalStorage.set(TOKENS_LS, tokens);
    } catch (err) {
      await LocalStorage.remove(TOKENS_LS);

      // @ts-ignore
      // this.store.dispatch(actions.removeIsAuth());
      // @ts-ignore
      // this.store.dispatch(actions.removeUser());
    }
  }
}

export const request = new Request();
