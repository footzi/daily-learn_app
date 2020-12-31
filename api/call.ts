import { SignInRequestBody, SignUpRequestBody } from '@interfaces';
import { request } from './requests';

export const ApiCall = {
  signIn(body: SignInRequestBody): Promise<void> {
    return request.public('post', '/api/signin', body);
  },

  signUp(body: SignUpRequestBody): Promise<void> {
    return request.public('post', '/api/signup', body);
  },

  mainData(): Promise<void> {
    return request.private('get', '/screens/home');
  },

  createDictionary(body): Promise<void> {
    return request.private('post', '/api/dictionary/create', body);
  },

  deleteDictionary(body): Promise<void> {
    return request.private('delete', '/api/dictionary/delete', body);
  },

  saveWord(body): Promise<void> {
    return request.private('post', '/api/words/create', body);
  },

  removeWord(body): Promise<void> {
    return request.private('delete', '/api/words/delete', body);
  },

  changeCountWord(body): Promise<void> {
    return request.private('put', '/api/words/changeCount', body);
  },

  changeProfile(body): Promise<void> {
    return request.private('put', '/api/user/change', body);
  },

  logout(): Promise<void> {
    return request.private('post', '/api/signout');
  },
};
