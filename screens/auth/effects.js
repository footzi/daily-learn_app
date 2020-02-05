import { LocalStorage } from '@libs';
import { USER_LS, TOKENS_LS } from '@constants';
import { actions } from '@store';

export const checkInitAuth = () => async dispatch => {
  const isAuth = await LocalStorage.has(TOKENS_LS);
  const user = await LocalStorage.get(USER_LS);

  if (isAuth && user) {
    dispatch(actions.setAuth());
    dispatch(actions.setUser(user));
  } else {
    dispatch(actions.removeAuth());
    dispatch(actions.removeUser());
  }
};
