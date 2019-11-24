import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from '@constants';
import { SETTINGS } from '@constants/settings'
import { getAsyncStorage } from '@libs';

export const request = (method = 'get', url, data = '', token = '') => {
  const headers = { Authorization: token };
  
  return axios({
    method,
    url: `${SETTINGS.host}${url}`,
    data,
    headers,
    withCredentials: true
  });
};

export const createFormData = params => {
  const formData = new FormData();
  
  for (const prop of Object.keys(params)) {
    formData.append(prop, params[prop]);
  }
  
  return formData;
};

export const setAuthData = async (refresh = false) => {
  const key = refresh ? REFRESH_TOKEN : ACCESS_TOKEN;
  const token = await getAsyncStorage(key);
  
  return `Bearer ${token}`;
};

export const checkAccessToken = async () => {
  const expire = await getAsyncStorage(EXPIRE_TOKEN);
  const isExpire = Number(expire) < Math.floor(Date.now() / 1000);
  
  return !isExpire;
};
