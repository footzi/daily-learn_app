import { request, setAsyncStorage, setAuthData } from '@store/utils';
import { ERROR, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from '../../constants';
import { actions } from '../../store';

// Исправить!
export const toSignOut = ({ navigation }) => async dispatch => {
  dispatch(actions.setProcessing(true));

  try {
    const token = await setAuthData('refresh');
    const response = await request('post', '/api/signout', '', token);
    const { data } = response.data;

    if (data.success) {
      setAsyncStorage(ACCESS_TOKEN, '');
      setAsyncStorage(REFRESH_TOKEN, '');
      setAsyncStorage(EXPIRE_TOKEN, '');

      navigation.navigate('SignIn');

      dispatch(actions.setData(''));
      dispatch(actions.setUser(0));
      dispatch(actions.setAuth(false));
      dispatch(actions.setProcessing(false));
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.setProcessing(false));
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};
