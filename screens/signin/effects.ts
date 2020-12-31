import { Dispatch } from 'react-redux';
import { LocalStorage, getErrorMessage } from '@libs';
import { ApiCall } from '@api';
import { TOKENS_LS, USER_LS, NOTIFICATION_TYPES, LOADING_ITEMS } from '@constants';
import * as actions from '@store';
import { ToSignInEffect } from './interfaces';

export const toSignIn = (body: ToSignInEffect) => async (dispatch: Dispatch): Promise<void> => {
  dispatch(actions.startLoading(LOADING_ITEMS.INNER));

  try {
    const response = await ApiCall.signIn(body);
    const { data } = response.data;
    const { user, tokens } = data;

    if (user && tokens) {
      dispatch(actions.setUser(user));
      dispatch(actions.setIsAuth());

      await LocalStorage.set(TOKENS_LS, tokens);
      await LocalStorage.set(USER_LS, user);
    }
  } catch (err) {
    dispatch(actions.setNotification({ type: NOTIFICATION_TYPES.ERROR, text: getErrorMessage(err) }));
  } finally {
    dispatch(actions.endLoading(LOADING_ITEMS.INNER));
  }
};
