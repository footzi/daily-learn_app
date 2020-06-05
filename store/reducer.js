import { initState } from './state';
import {
  SET_IS_LOADED,
  SET_NOTIFICATION,
  SET_PROCESSING,
  SET_USER,
  SET_IS_AUTH,
  SET_PROFILE,
  SET_DICTIONARIES,
} from '@constants';

// редьюсеры
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
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
    case SET_PROCESSING:
      return {
        ...state,
        processing: action.payload,
      };
    default:
      return state;
  }
};
