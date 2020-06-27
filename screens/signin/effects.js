import { startLoading, endLoading, setNotification, setUser, setIsAuth } from '@store';
import { LocalStorage, getErrorMessage } from '@libs';
import { ApiCall } from '@api';
import { TOKENS_LS, USER_LS, ERROR, LOADING_ITEMS } from '@constants';

export const toSignIn = (body = {}) => async (dispatch) => {
  dispatch(startLoading(LOADING_ITEMS.INNER));

  try {
    const response = await ApiCall.signIn(body);
    const { data } = response.data;
    const { user, tokens } = data;

    if (user && tokens) {
      dispatch(setUser(user));
      dispatch(setIsAuth());

      await LocalStorage.set(TOKENS_LS, tokens);
      await LocalStorage.set(USER_LS, user);
    }
  } catch (err) {
    dispatch(setNotification({ type: ERROR, text: getErrorMessage(err) }));
  } finally {
    dispatch(endLoading(LOADING_ITEMS.INNER));
  }
};
