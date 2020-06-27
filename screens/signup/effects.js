import { startLoading, endLoading, setNotification, setUser, setIsAuth } from '@store';
import { ERROR, TOKENS_LS, USER_LS, LOADING_ITEMS } from '@constants';
import { getErrorMessage, LocalStorage } from '@libs';
import { ApiCall } from '@api';

export const toSignUp = (body = {}) => async (dispatch) => {
  dispatch(startLoading(LOADING_ITEMS.INNER));

  try {
    const response = await ApiCall.signUp(body);
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
