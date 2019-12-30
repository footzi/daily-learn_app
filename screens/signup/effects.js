import { request } from '@api';
import { setAsyncStorage } from '@libs';
import { actions } from '@store';
import { ERROR, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from '@constants';

export const toSignUp = ({ navigation, body }) => async dispatch => {
  dispatch(actions.setProcessing());
  
  try {
    const response = await request('post', '/api/signup', body);
    const { data } = response.data;
    const { user } = data;

    if (user.id) {
      await setAsyncStorage(ACCESS_TOKEN, user.access_token);
      await setAsyncStorage(REFRESH_TOKEN, user.refresh_token);
      await setAsyncStorage(EXPIRE_TOKEN, String(user.expire));

      navigation.navigate('Start');

      dispatch(actions.setUser(user));
      dispatch(actions.setAuth());
      dispatch(actions.removeProcessing());
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.removeProcessing());
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};
