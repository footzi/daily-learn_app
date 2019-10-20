import { request, setAsyncStorage, setAuthData, checkAccessToken } from './utils';
import { ERROR, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from './constans';
import { actions } from './index';

export const toRefreshTokens = navigation => async dispatch => {
  const token = await setAuthData('refresh');

  try {
    const response = await request('post', '/api/refresh', '', token);

    const { data } = response.data;
    const { user } = data;

    setAsyncStorage(ACCESS_TOKEN, user.access_token);
    setAsyncStorage(REFRESH_TOKEN, user.refresh_token);
    setAsyncStorage(EXPIRE_TOKEN, String(user.expire));
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));

    setAsyncStorage(ACCESS_TOKEN, '');
    setAsyncStorage(REFRESH_TOKEN, '');
    setAsyncStorage(EXPIRE_TOKEN, '');

    dispatch(actions.setUser(0));
    dispatch(actions.setAuth(false));
    navigation.navigate('SignIn');
  }
};

export const getMainData = navigation => async dispatch => {
  const isValidAccessToken = await checkAccessToken();

  if (!isValidAccessToken) {
    await dispatch(toRefreshTokens(navigation));
  }

  try {
    const token = await setAuthData('refresh');
    const response = await request('get', '/screens/home', '', token);
    const { data } = response.data;
    
    console.log(data.irregularVerbs);

    dispatch(actions.setData(data));
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};

// export const clearMainData = () => dispatch => {
//   dispatch(actions.setData(''));
// };
