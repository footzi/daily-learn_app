import { request } from '@api';
import { actions } from '@store';
import { LocalStorage, getErrorMessage } from '@libs';
import { TOKENS_LS, USER_LS, ERROR } from '@constants';

export const toSignIn = (navigation = {}, body = {}) => async dispatch => {
  dispatch(actions.setProcessing());

  try {
    const response = await request('post', '/api/signin', body);
    const { data } = response.data;
    const { user, tokens } = data;

    if (user.id && tokens) {
      navigation.navigate('Start');

      dispatch(actions.setUser(user));
      dispatch(actions.setAuth());

      LocalStorage.set(TOKENS_LS, tokens);
      LocalStorage.set(USER_LS, user);
    }
  } catch (err) {
    dispatch(actions.setNotification({ type: ERROR, text: getErrorMessage(err) }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};
