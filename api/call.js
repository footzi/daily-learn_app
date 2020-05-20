import { request } from './requests';

export const ApiCall = {
  signIn(body) {
    return request.public('post', '/api/signin', body);
  },

  mainData() {
    return request.private('get', '/screens/home');
  }
};
