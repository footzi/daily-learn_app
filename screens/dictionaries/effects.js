import { request, setAuthData, checkAccessToken, createFormData } from '../../store/utils';
import { ERROR } from '../../store/constans';
import { actions } from '../../store';
import * as commonEffects from '../../store/common-effects';

export const createDictionary = ({ navigation, body }) => async dispatch => {
  dispatch(actions.setProcessing(true));

  if (!(await checkAccessToken())) {
    await dispatch(commonEffects.toRefreshTokens(navigation));
  }

  try {
    const formData = createFormData(body);
    const token = await setAuthData('refresh');
    const response = await request('post', '/api/dictionary/create', formData, token);
    const { data } = response.data;

    if (data.success) {
      dispatch(actions.setProcessing(false));
      dispatch(commonEffects.getMainData());

      navigation.navigate('Dictionary');
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
    dispatch(actions.setProcessing(false));
  }
};

export const saveWord = ({ navigation, body }) => async dispatch => {
  dispatch(actions.setProcessing(true));

  if (!(await checkAccessToken())) {
    await dispatch(commonEffects.toRefreshTokens(navigation));
  }

  try {
    const formData = createFormData(body);
    const token = await setAuthData('refresh');
    const response = await request('post', '/api/words/create', formData, token);
    const { data } = response.data;

    if (data.success) {
      dispatch(actions.setProcessing(false));
      dispatch(commonEffects.getMainData());
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
    dispatch(actions.setProcessing(false));
  }
};
