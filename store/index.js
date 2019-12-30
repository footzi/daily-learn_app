import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { SET_NOTIFICATION, SET_PROCESSING, SET_USER, SET_AUTH, SET_DATA } from '../constants';

// начальное состояние
export const initState = {
  auth: false,
  user: null,
  data: null,
  processing: false,
  test: '',
  notification: {
    type: '',
    text: ''
  }
};

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
    case 'SET_TEST':
      return {
        ...state,
        test: action.payload
      };
    default:
      return state;
  }
};

export const actions = {
  setAuth: () => ({ type: SET_AUTH, payload: true }),
  removeAuth: () => ({ type: SET_AUTH, payload: false }),

  setUser: payload => ({ type: SET_USER, payload }),
  removeUser: () => ({ type: SET_USER, payload: null }),

  setData: payload => ({ type: SET_DATA, payload }),
  clearData: () => ({ type: SET_DATA, payload: null }),

  setNotification: payload => ({ type: SET_NOTIFICATION, payload }),
  clearNotification: () => ({
    type: SET_NOTIFICATION,
    payload: {
      type: '',
      text: ''
    }
  }),

  setProcessing: () => ({ type: SET_PROCESSING, payload: true }),
  removeProcessing: () => ({ type: SET_PROCESSING, payload: false }),

  setTest: payload => ({ type: 'SET_TEST', payload })
};

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const configureStore = (initialState = initState) =>
  createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export const store = configureStore();
