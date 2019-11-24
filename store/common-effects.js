import { ERROR, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from '@constants';
import { refreshTokens, getMainData, checkAccessToken } from '@api';
import { setAsyncStorage } from '@libs';
import { actions } from './index';

const toRefreshTokens = navigation => async dispatch => {
  try {
    const { access_token, refresh_token, expire } = await refreshTokens();

    setAsyncStorage(ACCESS_TOKEN, access_token);
    setAsyncStorage(REFRESH_TOKEN, refresh_token);
    setAsyncStorage(EXPIRE_TOKEN, expire);
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));

    setAsyncStorage(ACCESS_TOKEN, '');
    setAsyncStorage(REFRESH_TOKEN, '');
    setAsyncStorage(EXPIRE_TOKEN, '');

    dispatch(actions.setUser(0));
    dispatch(actions.setAuth(false));
    navigation.navigate('SignIn');
  }
};

export const setMainData = navigation => async dispatch => {
  const isValidAccessToken = await checkAccessToken();

  if (!isValidAccessToken) {
    await dispatch(toRefreshTokens(navigation));
  }

  try {
    const data = await getMainData();

    dispatch(actions.setData(data));
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};

// export const clearMainData = () => dispatch => {
//   dispatch(actions.setData(''));
// };
