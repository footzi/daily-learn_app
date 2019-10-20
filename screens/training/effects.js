import { request, setAuthData, checkAccessToken, createFormData } from '../../store/utils';
import { ERROR } from '../../store/constans';
import { actions } from '../../store';
import * as commonEffects from '../../store/common-effects';

export const changeCountWord = ({ navigation, body }) => async dispatch => {
  if (!(await checkAccessToken())) {
    await dispatch(commonEffects.toRefreshTokens(navigation));
  }

  try {
    const formData = createFormData(body);
    const token = await setAuthData('refresh');
    const response = await request('post', '/api/words/changeCount', formData, token);
    const { data } = response.data;

    if (data.success) {
      dispatch(commonEffects.getMainData());
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
    dispatch(actions.setProcessing(false));
  }
};

export const changeCountVerb = ({ navigation, body }) => async dispatch => {
  if (!(await checkAccessToken())) {
    await dispatch(commonEffects.toRefreshTokens(navigation));
  }
  
  try {
    const formData = createFormData(body);
    const token = await setAuthData('refresh');
    const response = await request('post', '/api/irregular-verbs/changeCount', formData, token);
    const { data } = response.data;
    
    if (data.success) {
      dispatch(commonEffects.getMainData());
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
    dispatch(actions.setProcessing(false));
  }
};
