import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { SET_NOTIFICATION, SET_PROCESSING, SET_USER, SET_AUTH, SET_HOME } from './constans';

// начальное состояние
const initState = {
  processing: false,
  user: '',
  home: '',
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
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    case SET_HOME:
      return {
        ...state,
        home: action.payload
      };
    case SET_AUTH:
      return {
        ...state,
        auth: action.payload
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
  setHome: payload => dispatch => {
    dispatch({ type: SET_HOME, payload });
  }
};

// Экшены, возврашают тип, и какой-либо пэйлоад
// export const setNotification = payload => dispatch => {
//   dispatch({ type: SET_NOTIFICATION, payload });
// };

// export const setProcessing = payload => dispatch => {
//   dispatch({ type: SET_PROCESSING, payload });
// };

// export const setUser = user => dispatch => {
//   dispatch({ type: SET_USER, user });
// };

// export const setAuth = payload => dispatch => {
//   dispatch({ type: SET_AUTH, payload });
// };

// export const setHome = payload => dispatch => {
//   dispatch({ type: SET_HOME, payload });
// };

export default (initialState = initState) => createStore(reducer, initialState, applyMiddleware(thunk));
