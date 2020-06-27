import { ApiCall } from '@api';
import { ERROR } from '@constants';
import { setNotification } from '@store';

export const saveCountWord = (body) => async (dispatch) => {
  try {
    const response = await ApiCall.changeCountWord(body);
    const { data, error } = response.data;
    const { success } = data;

    if (!success) {
      throw new Error(error);
    }
  } catch (error) {
    dispatch(setNotification({ type: ERROR, text: error.message }));
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
    dispatch(setNotification({ type: ERROR, text: error.message }));
  }
};
