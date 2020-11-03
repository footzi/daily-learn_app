export interface User {
  id: number;
}

export interface Profile {
  login: string;
  email: string;
  paws: number;
}

export interface Word {
  id: number;
}
export interface Dictionary {
  id: number;
  name: string;
  words: Word[] | [];
}

// todo types
export interface Loading {
  id: number;
}

// todo types
export interface Errors {
  id: number;
}

export interface Notification {
  type: string;
  text: string;
}

export interface InitStateInterface {
  isAuth: boolean;
  user: null;
  dictionaries: Dictionary | [];
  profile: Profile;
  loading: object;
  errors: object;
  notification: Notification;
}
