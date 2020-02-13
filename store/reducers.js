import { initState } from './state';
import { SET_NOTIFICATION, SET_PROCESSING, SET_USER, SET_AUTH, SET_DATA } from '@constants';

// редьюсеры
export const reducers = (state = initState, action) => {
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
