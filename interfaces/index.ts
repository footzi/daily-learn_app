export * from './user';
export * from './maybe';
export * from './tokens';

import { NOTIFICATION_TYPES } from '@constants';

// MAIN
// export interface Tokens {
//   access_token: string;
//   refresh_token: string;
//   expire: number;
// }

// export interface User {
//   id: number;
// }

// export interface Profile {
//   login: string;
//   email: string;
//   paws: number;
// }

export interface Dictionary {
  id: number;
  name: string;
  words?: Words;
}
export type Dictionaries = Dictionary[];

export interface Word {
  id: number;
  name: string;
  groupId: number;
  count: number;
  translate: string;
  nameCount: number;
  translateCount: number;
}
export type Words = Word[];

// export interface User {
//   id: number;
// }

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

export interface CreateDictionaryRequestBody {
  name: string;
}

export interface DeleteDictionaryRequestBody {
  id: number;
}

export interface SaveWordRequestBody {
  name: string;
  translate: string;
  dictionary_id: number;
}

export interface RemoveWordRequestBody {
  ids: string;
}

export interface ChangeCountWordRequestBody {
  id: number;
  type: string;
}

export interface ChangeProfileRequestBody {
  paws: number;
}
