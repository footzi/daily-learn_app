import { Dispatch } from 'react-redux';
import { NOTIFICATION_TYPES, TOKENS_LS, USER_LS, LOADING_ITEMS } from '@constants';
import { getErrorMessage, LocalStorage } from '@libs';
import { ApiCall } from '@api';
import * as actions from '@store';
import { ToSignUpEffect } from './interfaces';

export const toSignUp = (body: ToSignUpEffect) => async (dispatch: Dispatch): Promise<void> => {
  dispatch(actions.startLoading(LOADING_ITEMS.INNER));

  try {
    const response = await ApiCall.signUp(body);
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
