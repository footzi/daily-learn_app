import { Dispatch } from 'react-redux';
import { ApiCall } from '@api';
import { NOTIFICATION_TYPES, TOKENS_LS, USER_LS, LOADING_ITEMS } from '@constants';
import { LocalStorage } from '@libs';
import * as actions from '@store';

export const toSignOut = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(actions.startLoading(LOADING_ITEMS.INNER));

  try {
    const response = await ApiCall.logout();
    const { data, error } = response.data;
    const { success } = data;

    if (!success) {
      throw new Error(error);
    }

    dispatch(actions.endLoading(LOADING_ITEMS.INNER));
    dispatch(actions.removeUser());
    dispatch(actions.removeIsAuth());

    await LocalStorage.remove(TOKENS_LS);
    await LocalStorage.remove(USER_LS);
  } catch (error) {
    dispatch(actions.setNotification({ type: NOTIFICATION_TYPES.ERROR, text: error.message }));
    dispatch(actions.endLoading(LOADING_ITEMS.INNER));
  }
};
