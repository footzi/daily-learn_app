import { requestWithToken } from "@api";
import { ERROR } from '@constants';
import { actions } from '@store';
import * as commonEffects from '@store/common-effects';

export const createDictionary = ({ navigation, body }) => async dispatch => {
  dispatch(actions.setProcessing(true));

  try {
    const response = await requestWithToken('post', '/api/dictionary/create', body);
    const { data } = response.data;

    if (data.success) {
      dispatch(actions.setProcessing(false));
      dispatch(commonEffects.setMainData());

      navigation.navigate('Dictionary');
    }
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
    dispatch(actions.setProcessing(false));
  }
};

export const saveWord = ({ body }) => async dispatch => {
  dispatch(actions.setProcessing(true));

  try {
    const response = await requestWithToken('post', '/api/words/create', body);
    const { data } = response.data;

    if (data.success) {
      dispatch(actions.setProcessing(false));
      dispatch(commonEffects.setMainData());
    }
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
    dispatch(actions.setProcessing(false));
  }
};
