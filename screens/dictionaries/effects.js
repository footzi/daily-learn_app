import { ERROR } from '@constants';
import { startLoading, endLoading, setNotification } from '@store';
import { ApiCall } from '@api';
import { SCREENS, LOADING_ITEMS } from '@constants';
import { updateData } from '@store/common-effects';

export const createDictionary = ({ navigation, body, closeModal }) => async (dispatch, getState) => {
  dispatch(startLoading(LOADING_ITEMS.INNER));

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
    dispatch(setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(endLoading(LOADING_ITEMS.INNER));
  }
};

export const saveWord = ({ fields, preview_dictionary }) => async (dispatch) => {
  dispatch(startLoading(LOADING_ITEMS.INNER));

  try {
    const body = {
      name: JSON.stringify([fields.name]),
      translate: JSON.stringify(fields.translate.map((item) => item.value)),
      dictionary_id: preview_dictionary.id,
    };

    const response = await ApiCall.saveWord(body);

    const { data, error } = response.data;
    const { success } = data;

    if (!success) {
      throw new Error(error);
    }

    dispatch(updateData());
  } catch (error) {
    dispatch(setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(endLoading(LOADING_ITEMS.INNER));
  }
};

export const removeWord = (ids) => async (dispatch) => {
  dispatch(startLoading(LOADING_ITEMS.INNER));

  try {
    const response = await ApiCall.removeWord({ ids: JSON.stringify(ids) });
    const { data, error } = response.data;
    const { success } = data;

    if (!success) {
      throw new Error(error);
    }

    dispatch(updateData());
  } catch (error) {
    dispatch(setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(endLoading(LOADING_ITEMS.INNER));
  }
};
