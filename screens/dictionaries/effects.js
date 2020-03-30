import { requestWithToken } from '@api';
import { ERROR } from '@constants';
import { actions } from '@store';
import { SCREENS } from '@constants';
import * as commonEffects from '@store/common-effects';

export const createDictionary = ({ navigation, body, closeModal }) => async (dispatch, getState) => {
  dispatch(actions.setProcessing());

  try {
    const response = await requestWithToken('post', '/api/dictionary/create', body);
    const { data } = response.data;
    const { success, id } = data;

    if (!success) {
      throw new Error();
    }

    await dispatch(commonEffects.getMainData());

    const state = getState();
    const { dictionaries } = state.data;
    const preview_dictionary = dictionaries.find(item => item.id === id);

    closeModal();
    navigation.navigate(SCREENS.PREVIEW_DICTIONARY, { preview_dictionary }); //NAVIGATION_PARAMS.preview_dictionary
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};

export const saveWord = ({ fields, preview_dictionary }) => async dispatch => {
  dispatch(actions.setProcessing());

  try {
    const body = {
      name: JSON.stringify([fields.name]),
      translate: JSON.stringify(fields.translate.map(item => item.value)),
      dictionary_id: preview_dictionary.id
    };

    const response = await requestWithToken('post', '/api/words/create', body);

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

export const removeWord = ids => async dispatch => {
  dispatch(actions.setProcessing());

  try {
    const response = await requestWithToken('delete', '/api/words/delete', { ids: JSON.stringify(ids) });
    const { data } = response.data;

    if (data.success) {
      dispatch(commonEffects.getMainData());
    }
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.setProcessing());
  }
};
