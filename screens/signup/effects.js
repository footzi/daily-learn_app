import { request, createFormData, setAsyncStorage } from '../../store/utils';
import { ERROR, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from '@constants';
import { actions } from '../../store';

export const toSignUp = ({ navigation, body }) => async dispatch => {
  dispatch(actions.setProcessing(true));

  const formData = createFormData(body);

  try {
    const response = await request('post', '/api/signup', formData);
    const { data } = response.data;
    const { user } = data;

    if (user.id) {
      await setAsyncStorage(ACCESS_TOKEN, user.access_token);
      await setAsyncStorage(REFRESH_TOKEN, user.refresh_token);
      await setAsyncStorage(EXPIRE_TOKEN, String(user.expire));

      navigation.navigate('Start');

      dispatch(actions.setUser(user));
      dispatch(actions.setAuth(true));
      dispatch(actions.setProcessing(false));
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.setProcessing(false));
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};
