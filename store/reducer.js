import { initState } from './state';
import {
  SET_NOTIFICATION,
  SET_PROCESSING,
  SET_USER,
  SET_AUTH,
  SET_DATA,
  SET_HOME_SCREEN,
  SET_DICTINARY_WORDS
} from '@constants';

// редьюсеры
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        auth: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_DATA:
      return {
        ...state,
        data: action.payload
      };
    case SET_HOME_SCREEN: {
      return {
        ...state,
        homeScreen: action.payload
      };
    }
    case SET_DICTINARY_WORDS: {
      return {
        ...state,
        dictionariesScreen: {
          ...state.dictionariesScreen,
          dictionaryWords: action.payload
        }
      };
    }
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: {
          type: action.payload.type,
          text: action.payload.text
        }
      };
    case SET_PROCESSING:
      return {
        ...state,
        processing: action.payload
      };
    default:
      return state;
  }
};
