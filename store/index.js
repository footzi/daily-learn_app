import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { request, createFormData } from './utils';
import { SET_NOTIFICATION, SET_PROCESSING, SET_USER, ERROR, SUCCESS } from './constans';
// const { domain } = require('../server.config');

// начальное состояние
const initState = {
  processing: false,
  user: '',
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

export const toRefreshTokens = ({ settings }) => async dispatch => {
  try {
    const response = await axios.post(`${domain}/api/refresh`, settings);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const toSignUp = ({ body, setToken, redirect }) => async dispatch => {
  dispatch(setProcessing(true));

  const formData = createFormData(body);

  try {
    const response = await request('post', '/api/signup', formData);
    const { data } = response.data;

    dispatch(setProcessing(false));

    if (data.user.id) {
      dispatch(setNotification({ type: SUCCESS, text: 'Вы успешно зарегистрировались' }));
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(setProcessing(false));
    dispatch(setNotification({ type: ERROR, text: error.message }));
  }

  // dispatch(setNotification({type: SUCCESS, text: 'Вход произошел успешно'}));

  // axios
  //   .post('https://daily-learn-backend.herokuapp.com/api/signup', formData  )
  //   .then(response => {
  //     console.log(response.data)
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  // for (const prop of Object.keys(body)) {
  //   formData.append(prop, body[prop]);
  // }

  // axios
  //   .post(`${domain}/api/signin`, formData)
  //   .then(response => {
  //     const { user } = response.data;
  //     const { access_token, refresh_token, id } = user;

  //     setToken(access_token, refresh_token);
  //     redirect(id);
  //     dispatch(setUser(user));
  //     dispatch(setNotification({ success: 'Вход произошел успешно' }));
  //   })
  //   .catch(error => {
  //     console.log(error.response);
  //     dispatch(setNotification(error.response.data));
  //   });
};

// export const toSignUp = ({ body, setToken, redirect }) => dispatch => {
//   // const formData = new FormData();

//   // for (const prop of Object.keys(body)) {
//   //   formData.append(prop, body[prop]);
//   // }

//   // axios
//   //   .post(`${domain}/api/signup`, formData)
//   //   .then(response => {
//   //     const { user } = response.data;
//   //     const { access_token, refresh_token, id } = user;

//   //     setToken(access_token, refresh_token);
//   //     redirect(id);
//   //     dispatch(setNotification({ success: 'Регистрация прошла успешно' }));
//   //     dispatch(setUser(user));
//   //   })
//   //   .catch(error => {
//   //     console.log(error.response);
//   //     dispatch(setNotification(error.response.data));
//   //   });
// };

export const toSignOut = ({ removeToken, redirect }) => dispatch => {
  // removeToken();
  // redirect();
  // dispatch(setUser(null));
};

export default (initialState = initState) =>
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
