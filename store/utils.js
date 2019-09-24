import axios from 'axios';

// const host = 'https://daily-learn-backend.herokuapp.com';
const host = 'http://192.168.0.100:8080'

export const request = async (method = 'get', url, data, settings) => {
  return await axios({
    method,
    url: `${host}${url}`,
    data
  });
};


export const createFormData = (params) => {
  const formData = new FormData();

  for (const prop of Object.keys(params)) {
    formData.append(prop, params[prop]);
  }

  return formData;
}