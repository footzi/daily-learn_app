import { ERROR, USER_LS, TOKENS_LS } from '@constants';
import { requestWithToken } from '@api';
import { LocalStorage } from '@libs';
import { actions } from './index';

export const checkInitAuth = () => async dispatch => {
  const isAuth = await LocalStorage.has(TOKENS_LS);
  const user = await LocalStorage.get(USER_LS);

  if (isAuth && user) {
    dispatch(actions.setAuth());
    dispatch(actions.setUser(user));
  } else {
    dispatch(actions.removeAuth());
    dispatch(actions.removeUser());
  }
};


export const getMainData = () => async dispatch => {
  dispatch(actions.setProcessing());

  try {
    const response = await requestWithToken('get', '/screens/home');
    const { data } = response.data;

    dispatch(actions.setData(data));
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};
