import { ERROR } from '@constants';
import { ApiCall } from '@api';
import { SCREENS, LOADING_ITEMS } from '@constants';
import { updateData } from '@store/common-effects';
import * as actions from '@store';

export const createDictionary = ({ navigation, body, closeModal }) => async (dispatch, getState) => {
  dispatch(actions.startLoading(LOADING_ITEMS.INNER));

  try {
    const response = await ApiCall.createDictionary(body);
    const { data, error } = response.data;
    const { success, id } = data;

    if (!success) {
      throw new Error(error);
    }

    await dispatch(updateData());

    const state = getState();
    const { dictionaries } = state;
    const preview_dictionary = dictionaries.find((item) => item.id === id);

    closeModal();
    navigation.navigate(SCREENS.PREVIEW_DICTIONARY, { preview_dictionary });
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.endLoading(LOADING_ITEMS.INNER));
  }
};
