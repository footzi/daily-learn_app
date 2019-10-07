import { request, createFormData, setAsyncStorage } from '../../store/utils';
import { actions } from '../../store';
import { ERROR, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from '../../store/constans';

export const toSignIn = ({ body }) => async dispatch => {
  dispatch(actions.setProcessing(true));

  const formData = createFormData(body);

  try {
    const response = await request('post', '/api/signin', formData);
    const { data } = response.data;
    const { user } = data;

    dispatch(actions.setProcessing(false));

    if (user.id) {
      await setAsyncStorage(ACCESS_TOKEN, user.access_token);
      await setAsyncStorage(REFRESH_TOKEN, user.refresh_token);
      await setAsyncStorage(EXPIRE_TOKEN, String(user.expire));

      dispatch(actions.setUser(user.id));
      dispatch(actions.setAuth(true));
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.setProcessing(false));
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};