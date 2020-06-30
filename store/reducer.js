import { initState } from './state';
import {
  SET_NOTIFICATION,
  SET_USER,
  SET_IS_AUTH,
  SET_PROFILE,
  SET_DICTIONARIES,
  SET_LOADING_ITEM,
  REMOVE_LOADING_ITEM,
} from '@constants';

// редьюсеры
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_DICTIONARIES: {
      return {
        ...state,
        dictionaries: action.payload,
      };
    }
    case SET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: {
          type: action.payload.type,
          text: action.payload.text,
        },
      };
    case SET_LOADING_ITEM: {
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload]: true,
        },
      };
    }
    case REMOVE_LOADING_ITEM: {
      const loading = state.loading;
      delete loading[action.payload];

      return {
        ...state,
        loading,
      };
    }
    default:
      return state;
  }
};
