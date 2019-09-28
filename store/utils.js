import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from './constans';
// const host = 'https://daily-learn-backend.herokuapp.com';
const host = 'http://192.168.0.100:8080';

export const request = async (method = 'get', url, data, settings = {}) => {
  return await axios({
    method,
    url: `${host}${url}`,
    data,
    settings
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

  return { Authorization: `Bearer ${token}` };
};

export const checkAccessToken = async () => {
  const expire_token = await getAsyncStorage(EXPIRE_TOKEN);
  //const ACCESS_TOKEN = await getAsyncStorage(ACCESS_TOKEN);

  return false;
  //console.log(Math.floor(Date.now() / 1000))
};
