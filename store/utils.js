import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from './constans';
const host = 'https://daily-learn-backend.herokuapp.com';
// const host = 'http://192.168.0.100:8080';

export const request = async (method = 'get', url, data = '', token = '') => {
  const headers = { Authorization: token };

  return await axios({
    method,
    url: `${host}${url}`,
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

export const setAsyncStorage = (key, value) => AsyncStorage.setItem(key, value);
export const getAsyncStorage = key => AsyncStorage.getItem(key);

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
