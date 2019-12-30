import { requestWithToken } from '@api';
import { setAsyncStorage } from '@libs';
import { ERROR, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRE_TOKEN } from '@constants';
import { actions } from '@store';

export const toSignOut = ({ navigation }) => async dispatch => {
  dispatch(actions.setProcessing());

  try {
    const response = await requestWithToken('post', '/api/signout');
    const { data } = response.data;

    if (data.success) {
      setAsyncStorage(ACCESS_TOKEN, '');
      setAsyncStorage(REFRESH_TOKEN, '');
      setAsyncStorage(EXPIRE_TOKEN, '');

      navigation.navigate('SignIn');

      dispatch(actions.clearData());
      dispatch(actions.removeUser());
      dispatch(actions.removeAuth());
      dispatch(actions.removeProcessing());
    }
  } catch (error) {
    dispatch(actions.removeProcessing());
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};
