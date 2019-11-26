import { requestWithToken } from '@api';
import { setAsyncStorage } from '@libs';
import { ERROR, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from '@constants';
import { actions } from '@store';

export const toSignOut = ({ navigation }) => async dispatch => {
  dispatch(actions.setProcessing(true));

  try {
    const response = await requestWithToken('post', '/api/signout');
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
  } catch (error) {
    dispatch(actions.setProcessing(false));
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};
