import { ApiCall } from '@api';
import { ERROR, TOKENS_LS, USER_LS } from '@constants';
import { actions } from '@store';
import { LocalStorage } from '@libs';

export const toSignOut = () => async (dispatch) => {
  dispatch(actions.setProcessing());

  try {
    const response = await ApiCall.logout();
    const { data, error } = response.data;
    const { success } = data;

    if (!success) {
      throw new Error(error);
    }

    dispatch(actions.removeProcessing()); // не в finally иначе на логин весит лоадер
    dispatch(actions.removeIsLoaded());
    dispatch(actions.removeUser());
    dispatch(actions.removeIsAuth());
    // dispatch(actions.clearData());

    await LocalStorage.remove(TOKENS_LS);
    await LocalStorage.remove(USER_LS);
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
    dispatch(actions.removeProcessing());
  }
};
