import { ERROR } from '@constants';
import { actions } from '@store';
import { ApiCall } from '@api';
import { SCREENS } from '@constants';
import * as commonEffects from '@store/common-effects';

export const createDictionary = ({ navigation, body, closeModal }) => async (dispatch, getState) => {
  dispatch(actions.setProcessing());

  try {
    const response = await ApiCall.createDictionary(body);
    const { data, error } = response.data;
    const { success, id } = data;

    if (!success) {
      throw new Error(error);
    }

    await dispatch(commonEffects.getMainData());

    const state = getState();
    const { dictionaries } = state;
    const preview_dictionary = dictionaries.find((item) => item.id === id);

    closeModal();
    navigation.navigate(SCREENS.PREVIEW_DICTIONARY, { preview_dictionary });
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};

export const saveWord = ({ fields, preview_dictionary }) => async (dispatch) => {
  dispatch(actions.setProcessing());

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

    dispatch(commonEffects.getMainData());
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};

export const removeWord = (ids) => async (dispatch) => {
  dispatch(actions.setProcessing());

  try {
    const response = await ApiCall.removeWord({ ids: JSON.stringify(ids) });
    const { data, error } = response.data;
    const { success } = data;

    if (!success) {
      throw new Error(error);
    }

    dispatch(commonEffects.getMainData());
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.setProcessing());
  }
};
