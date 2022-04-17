import { State } from './interfaces';

export const initialState: State = {
  user: null,
  dictionaries: [],
  notification: {
    type: '',
    text: '',
  },
  refetchMainData: () => null,
};
