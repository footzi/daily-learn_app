import { request } from './requests';

export const ApiCall = {
  signIn(body) {
    return request.public('post', '/api/signin', body);
  },

  signUp(body) {
    return request.public('post', '/api/signup', body);
  },

  mainData() {
    return request.private('get', '/screens/home');
  },

  createDictionary(body) {
    return request.private('post', '/api/dictionary/create', body);
  },

  deleteDictionary(body) {
    return request.private('delete', '/api/dictionary/delete', body);
  },

  saveWord(body) {
    return request.private('post', '/api/words/create', body);
  },

  removeWord(body) {
    return request.private('delete', '/api/words/delete', body);
  },

  changeCountWord(body) {
    return request.private('put', '/api/words/changeCount', body);
  },

  changeProfile(body) {
    return request.private('put', '/api/user/change', body);
  },

  logout() {
    return request.private('post', '/api/signout');
  },
};
