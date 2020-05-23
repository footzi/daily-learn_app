import { actions } from '@store';
import { ERROR, TOKENS_LS, USER_LS } from '@constants';
import { getErrorMessage, LocalStorage } from '@libs';
import { ApiCall } from '@api';

export const toSignUp = (body = {}) => async dispatch => {
  dispatch(actions.setProcessing());

  try {
    const response = await ApiCall.signUp(body);
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
