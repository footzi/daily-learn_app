import { requestWithToken } from '@api';
import { ERROR } from '@constants';
import { actions } from '@store';
import * as commonEffects from '@store/common-effects';

export const createDictionary = ({ navigation, body }) => async dispatch => {
  dispatch(actions.setProcessing());

  try {
    const response = await requestWithToken('post', '/api/dictionary/create', body);
    const { data } = response.data;

    if (data.success) {
      dispatch(actions.removeProcessing());
      dispatch(commonEffects.getMainData());

      navigation.navigate('Dictionary');
    }
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
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
