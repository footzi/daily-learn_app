import { NOTIFICATION_TYPES } from '@constants';

// MAIN
export interface User {
  id: number;
}

export interface Profile {
  login: string;
  email: string;
  paws: number;
}

export interface Dictionary {
  id: number;
  name: string;
  words: Words;
}
export type Dictionaries = Dictionary[] | [];

export interface Word {
  id: number;
}
export type Words = Word[] | [];

export interface User {
  id: number;
}

export interface Notification {
  type: NOTIFICATION_TYPES.ERROR | '';
  text: string;
}

// REQUESTS
export interface SignInRequestBody {
  login: string;
  password: string;
}

export interface SignUpRequestBody {
  login: string;
  email: string;
  password: string;
}