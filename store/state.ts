import { InitStateInterface } from './interfaces';

export const initState: InitStateInterface = {
  isAuth: null,
  user: null,
  dictionaries: [],
  profile: {
    login: '',
    email: '',
    paws: 0,
  },
  loading: null,
  // errors: {},
  notification: {
    type: '',
    text: '',
  },
};
