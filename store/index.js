import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { request, createFormData, setAsyncStorage, setAuthData, checkAccessToken } from './utils';
import {
  SET_NOTIFICATION,
  SET_PROCESSING,
  SET_USER,
  SET_AUTH,
  SET_HOME,
  ERROR,
  SUCCESS,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRE_TOKEN
} from './constans';
// const { domain } = require('../server.config');

// начальное состояние
const initState = {
  processing: false,
  user: '',
  home: '',
  auth: false,
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

// Экшены, возврашают тип, и какой-либо пэйлоад
export const setNotification = payload => dispatch => {
  dispatch({ type: SET_NOTIFICATION, payload });
};

export const setProcessing = payload => dispatch => {
  dispatch({ type: SET_PROCESSING, payload });
};

export const setUser = user => dispatch => {
  dispatch({ type: SET_USER, user });
};

export const setAuth = payload => dispatch => {
  dispatch({ type: SET_AUTH, payload });
};

export const setHome = payload => dispatch => {
  dispatch({ type: SET_HOME, payload });
};

export const checkInitAuth = () => async dispatch => {
  const token = await setAuthData('refresh');

  dispatch(setAuth(token ? true : false));
};

export const toRefreshTokens = () => async dispatch => {
  const token = await setAuthData('refresh');

  try {
    const response = await request('post', '/api/refresh', '', token);

    const { data } = response.data;
    const { user } = data;

    setAsyncStorage(ACCESS_TOKEN, user.access_token);
    setAsyncStorage(REFRESH_TOKEN, user.refresh_token);
    setAsyncStorage(EXPIRE_TOKEN, user.expire);
  } catch (err) {
    const { error } = err.response.data;
    dispatch(setNotification({ type: ERROR, text: error.message }));
  }
};

export const toSignUp = ({ body }) => async dispatch => {
  dispatch(setProcessing(true));

  const formData = createFormData(body);

  try {
    const response = await request('post', '/api/signup', formData);
    const { data } = response.data;
    const { user } = data;

    dispatch(setProcessing(false));

    if (user.id) {
      dispatch(setNotification({ type: SUCCESS, text: 'Вы успешно зарегистрировались' }));
      dispatch(setUser(user));
      dispatch(setAuth(true));

      setAsyncStorage(ACCESS_TOKEN, user.access_token);
      setAsyncStorage(REFRESH_TOKEN, user.refresh_token);
      setAsyncStorage(EXPIRE_TOKEN, user.expire);
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(setProcessing(false));
    dispatch(setNotification({ type: ERROR, text: error.message }));
  }
};

export const toSignIn = ({ body }) => async dispatch => {
  dispatch(setProcessing(true));

  const formData = createFormData(body);

  try {
    const response = await request('post', '/api/signin', formData);
    const { data } = response.data;
    const { user } = data;

    dispatch(setProcessing(false));

    if (user.id) {
      await setAsyncStorage(ACCESS_TOKEN, user.access_token);
      await setAsyncStorage(REFRESH_TOKEN, user.refresh_token);
      await setAsyncStorage(EXPIRE_TOKEN, String(user.expire));

      dispatch(setUser(user.id));
      dispatch(setAuth(true));
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(setProcessing(false));
    dispatch(setNotification({ type: ERROR, text: error.message }));
  }
};

export const getMainData = () => async dispatch => {
  const isValidAccessToken = await checkAccessToken();

  if (!isValidAccessToken) {
    await dispatch(toRefreshTokens());
  }

  try {
    const token = await setAuthData('refresh');
    const response = await request('get', '/screens/home', '', token);
    const { data } = response.data;
    const { home } = data;

    dispatch(setHome(home));
  } catch (err) {
    const { error } = err.response.data;
    dispatch(setNotification({ type: ERROR, text: error.message }));
  }
};

export const getSettingsData = () => async dispatch => {
  console.log('getSettingsData');
};

export const toSignOut = ({ removeToken, redirect }) => dispatch => {
  // removeToken();
  // redirect();
  // dispatch(setUser(null));
};

export default (initialState = initState) =>
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
