import { getAsyncStorage } from '@libs';
import { REFRESH_TOKEN } from '@constants';
import { actions } from '@store';

export const checkInitAuth = () => async dispatch => {
  const token = await getAsyncStorage(REFRESH_TOKEN);

  if (token) {
    actions.setAuth();
  } else {
    actions.removeUser();
  }
};
