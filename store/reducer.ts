import { ACTIONS, State } from './interfaces';

export const reducer = (state: State, action): State => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    case ACTIONS.SET_DICTIONARIES:
      return { ...state, dictionaries: action.payload };
    case ACTIONS.SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    case ACTIONS.SET_REFETCH_MAIN_DATA:
      return { ...state, refetchMainData: action.payload };
  }
};
