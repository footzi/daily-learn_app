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

export const saveWord = ({ body }) => async dispatch => {
  dispatch(actions.setProcessing());

  try {
    const response = await requestWithToken('post', '/api/words/create', body);
    const { data } = response.data;

    if (data.success) {
      dispatch(actions.removeProcessing());
      dispatch(commonEffects.getMainData());
    }
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
    dispatch(actions.removeProcessing());
  }
};
