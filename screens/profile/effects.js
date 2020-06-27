import { ApiCall } from '@api';
import { ERROR, TOKENS_LS, USER_LS, LOADING_ITEMS } from '@constants';
import { startLoading, endLoading, setNotification, removeUser, removeIsAuth } from '@store';
import { LocalStorage } from '@libs';

export const toSignOut = () => async (dispatch) => {
  dispatch(startLoading(LOADING_ITEMS.INNER));

  try {
    const response = await ApiCall.logout();
    const { data, error } = response.data;
    const { success } = data;

    if (!success) {
      throw new Error(error);
    }

    dispatch(endLoading(LOADING_ITEMS.INNER));
    dispatch(removeUser());
    dispatch(removeIsAuth());

    await LocalStorage.remove(TOKENS_LS);
    await LocalStorage.remove(USER_LS);
  } catch (error) {
    dispatch(setNotification({ type: ERROR, text: error.message }));
    dispatch(endLoading(LOADING_ITEMS.INNER));
  }
};
