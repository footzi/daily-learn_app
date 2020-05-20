import axios from 'axios';
import { createFormData, getToken, checkAccessToken } from './helpers';
import { LocalStorage } from '@libs';
import { actions } from '@store';
import { TOKENS_LS, SETTINGS } from '@constants';

let instance = null;

class Request {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.store = {};

    return instance;
  }

  connectStore(store) {
    this.store = store;
  }

  public(method = 'get', url, body) {
    const data = createFormData(body);

    return axios({
      method,
      url: `${SETTINGS.host}${url}`,
      data,
      withCredentials: true
    });
  }

  async private(method = 'get', url, body) {
    const isValidAccessToken = await checkAccessToken();

    if (!isValidAccessToken) {
      await this._refreshTokens();
    }

    const token = await getToken('access');
    const headers = { Authorization: token };
    const data = body ? createFormData(body) : '';

    return axios({
      method,
      url: `${SETTINGS.host}${url}`,
      headers,
      data
    });
  }

  async _refreshToken() {
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

      await LocalStorage.set(TOKENS_LS, tokens);
    } catch (err) {
      await LocalStorage.remove(TOKENS_LS);

      this.store.dispatch(actions.removeIsAuth());
      this.store.dispatch(actions.clearData());
      this.store.dispatch(actions.removeUser());
    }
  }
}

// export const request = (method = 'get', url, body) => {
//   const data = createFormData(body);
//
//   return axios({
//     method,
//     url: `${SETTINGS.host}${url}`,
//     data,
//     withCredentials: true
//   });
// };

// export const requestWithToken = async (method = 'get', url, body) => {
//   const isValidAccessToken = await checkAccessToken();
//
//   await refreshTokens();
//   // if (!isValidAccessToken) {
//   //   await refreshTokens();
//   // }
//
//   const token = await getToken('access');
//   const headers = { Authorization: token };
//   const data = body ? createFormData(body) : '';
//
//   try {
//     return axios({
//       method,
//       url: `${SETTINGS.host}${url}`,
//       headers,
//       data
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
//
// const refreshTokens = async () => {
//   const token = await getToken('refresh');
//   const headers = { Authorization: token };
//
//   try {
//     const response = await axios({
//       method: 'post',
//       url: `${SETTINGS.host}/api/refresh`,
//       headers
//     });
//
//     const { data } = response.data;
//     const { tokens } = data;
//
//     throw 'err';
//
//     await LocalStorage.set(TOKENS_LS, tokens);
//   } catch (err) {
//     console.log(stories.getState());
//     await LocalStorage.remove(TOKENS_LS);
//
//     console.log('');
//
//     //store.dispatch(actions.removeIsAuth());
//     store.dispatch(actions.clearData());
//     //store.dispatch(actions.removeUser());
//   }
// };

export const request = new Request();
