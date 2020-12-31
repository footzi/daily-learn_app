import { ApiCall } from '@api';
import { NOTIFICATION_TYPES } from '@constants';
import * as actions from '@store';

export const saveCountWord = (body) => async (dispatch) => {
  try {
    const response = await ApiCall.changeCountWord(body);
    const { data, error } = response.data;
    const { success } = data;

    if (!success) {
      throw new Error(error);
    }
  } catch (error) {
    dispatch(actions.setNotification({ type: NOTIFICATION_TYPES.ERROR, text: error.message }));
  }
};

export const saveCountPaws = (paws) => async (dispatch) => {
  try {
    const response = await ApiCall.changeProfile({ paws });
    const { data, error } = response.data;
    const { success } = data;

    if (!success) {
      throw new Error(error);
    }
  } catch (error) {
    dispatch(actions.setNotification({ type: NOTIFICATION_TYPES.ERROR, text: error.message }));
  }
};
