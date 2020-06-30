import { ApiCall } from '@api';
import { ERROR, TOKENS_LS, USER_LS, LOADING_ITEMS } from '@constants';
import { LocalStorage } from '@libs';
import * as actions from '@store';

export const toSignOut = () => async (dispatch) => {
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
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
    dispatch(actions.endLoading(LOADING_ITEMS.INNER));
  }
};
