import { requestWithToken } from '@api';
import { ERROR, TOKENS_LS, USER_LS } from '@constants';
import { actions } from '@store';
import { LocalStorage } from '@libs';

export const toSignOut = ({ navigation }) => async dispatch => {
  dispatch(actions.setProcessing());

  try {
    const response = await requestWithToken('post', '/api/signout');
    const { data } = response.data;

    if (data.success) {
      navigation.navigate('SignIn');

      dispatch(actions.clearData());
      dispatch(actions.removeUser());
      dispatch(actions.removeAuth());

      LocalStorage.remove(TOKENS_LS);
      LocalStorage.remove(USER_LS);
    }
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};
