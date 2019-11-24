import { getAsyncStorage } from '../../store/utils';
import { REFRESH_TOKEN, ERROR } from '../../constants';
import { actions } from '../../store';

export const checkInitAuth = () => async dispatch => {
  const token = await getAsyncStorage(REFRESH_TOKEN);

  dispatch(actions.setAuth(token ? true : false));
};
