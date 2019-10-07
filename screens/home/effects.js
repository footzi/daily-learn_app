import { request, setAuthData, checkAccessToken } from '../../store/utils';
import { ERROR } from '../../store/constans';
import { actions } from '../../store';
import * as commonEffects from '../../store/common-effects';

export const getMainData = () => async dispatch => {
  const isValidAccessToken = await checkAccessToken();

  if (!isValidAccessToken) {
    await dispatch(commonEffects.toRefreshTokens());
  }

  try {
    const token = await setAuthData('refresh');
    const response = await request('get', '/screens/home', '', token);
    const { data } = response.data;
    const { home } = data;

    dispatch(actions.setHome(home));
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};
