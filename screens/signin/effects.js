import { actions } from '@store';
import { LocalStorage, getErrorMessage } from '@libs';
import { ApiCall } from '@api';
import { TOKENS_LS, USER_LS, ERROR } from '@constants';

export const toSignIn = (body = {}) => async (dispatch) => {
  dispatch(actions.setProcessing());

  try {
    const response = await ApiCall.signIn(body);
    const { data } = response.data;
    const { user, tokens } = data;

    if (user && tokens) {
      dispatch(actions.setUser(user));
      dispatch(actions.setIsAuth());

      await LocalStorage.set(TOKENS_LS, tokens);
      await LocalStorage.set(USER_LS, user);
    }
  } catch (err) {
    dispatch(actions.setNotification({ type: ERROR, text: getErrorMessage(err) }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};
