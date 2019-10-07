import { request, createFormData, setAsyncStorage } from '../../store/utils';
import { ERROR, SUCCESS, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from '../../store/constans';
import { actions } from '../../store';

export const toSignUp = ({ body }) => async dispatch => {
  dispatch(actions.setProcessing(true));

  const formData = createFormData(body);

  try {
    const response = await request('post', '/api/signup', formData);
    const { data } = response.data;
    const { user } = data;

    dispatch(actions.setProcessing(false));

    if (user.id) {
      dispatch(actions.setNotification({ type: SUCCESS, text: 'Вы успешно зарегистрировались' }));
      dispatch(actions.setUser(user));
      dispatch(actions.setAuth(true));

      setAsyncStorage(ACCESS_TOKEN, user.access_token);
      setAsyncStorage(REFRESH_TOKEN, user.refresh_token);
      setAsyncStorage(EXPIRE_TOKEN, user.expire);
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.setProcessing(false));
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};
