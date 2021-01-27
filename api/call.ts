import { AxiosResponse } from 'axios';

import {
  SignInRequestBody,
  SignUpRequestBody,
  CreateDictionaryRequestBody,
  DeleteDictionaryRequestBody,
  SaveWordRequestBody,
  RemoveWordRequestBody,
  ChangeCountWordRequestBody,
  ChangeProfileRequestBody,
} from '@interfaces';
import { request } from './requests';

export const ApiCall = {
  signIn(body: SignInRequestBody): Promise<AxiosResponse> {
    return request.public('post', '/api/signin', body);
  },

  signUp(body: SignUpRequestBody): Promise<AxiosResponse> {
    return request.public('post', '/api/signup', body);
  },

  mainData(): Promise<AxiosResponse> {
    return request.private('get', '/screens/home');
  },

  createDictionary(body: CreateDictionaryRequestBody): Promise<AxiosResponse> {
    return request.private('post', '/api/dictionary/create', body);
  },

  deleteDictionary(body: DeleteDictionaryRequestBody): Promise<AxiosResponse> {
    return request.private('delete', '/api/dictionary/delete', body);
  },

  saveWord(body: SaveWordRequestBody): Promise<AxiosResponse> {
    return request.private('post', '/api/words/create', body);
  },

  removeWord(body: RemoveWordRequestBody): Promise<AxiosResponse> {
    return request.private('delete', '/api/words/delete', body);
  },

  changeCountWord(body: ChangeCountWordRequestBody): Promise<AxiosResponse> {
    return request.private('put', '/api/words/changeCount', body);
  },

  changeProfile(body: ChangeProfileRequestBody): Promise<AxiosResponse> {
    return request.private('put', '/api/user/change', body);
  },

  logout(): Promise<AxiosResponse> {
    return request.private('post', '/api/signout');
  },
};
