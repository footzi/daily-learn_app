import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { SET_NOTIFICATION, SET_PROCESSING, SET_USER, SET_AUTH, SET_DATA } from '../constants';

// начальное состояние
const initState = {
  processing: false,
  user: '',
  data: '',
  auth: '',
  notification: {
    type: '',
    text: ''
  }
};

// редьюсеры
export const reducer = (state = initState, action) => {
  switch (action.type) {
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
    case SET_AUTH:
      return {
        ...state,
        auth: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    case SET_DATA:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export const actions = {
  setNotification: payload => dispatch => {
    dispatch({ type: SET_NOTIFICATION, payload });
  },
  setProcessing: payload => dispatch => {
    dispatch({ type: SET_PROCESSING, payload });
  },
  setUser: user => dispatch => {
    dispatch({ type: SET_USER, user });
  },
  setAuth: payload => dispatch => {
    dispatch({ type: SET_AUTH, payload });
  },
  setData: payload => dispatch => {
    dispatch({ type: SET_DATA, payload });
  }
};

const configureStore = (initialState = initState) => createStore(reducer, initialState, applyMiddleware(thunk));
export const store = configureStore();
