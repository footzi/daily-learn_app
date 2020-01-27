import { request } from '@api';
import { setAsyncStorage } from '@libs';
import { actions } from '@store';
import { ERROR, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from '@constants';

export const toSignIn = (navigation = {}, body = {}) => async dispatch => {
  dispatch(actions.setProcessing());

  try {
    const response = await request('post', '/api/signin', body);
    const { data } = response.data;
    const { user, tokens } = data;

    if (user.id && tokens) {
      await setAsyncStorage(ACCESS_TOKEN, tokens.access_token);
      await setAsyncStorage(REFRESH_TOKEN, tokens.refresh_token);
      await setAsyncStorage(EXPIRE_TOKEN, String(tokens.expire));

      navigation.navigate('Start');

      dispatch(actions.setUser({ id: user.id }));
      dispatch(actions.setAuth());
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};
