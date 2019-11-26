import { requestWithToken } from '@api';
import { ERROR } from '@constants';
import { actions } from '@store';
import * as commonEffects from '@store/common-effects';

export const changeCountWord = ({ body}) => async (dispatch, getState) => {
  const {dictionaries} = getState().data;
  console.log(dictionaries);
  // const word = dictionaries.filter((item) => )
  
  

  // try {
  //   const response = await requestWithToken('post', '/api/words/changeCount', body);
  //   const { data } = response.data;
  //
  //   if (data.success) {
  //     dispatch(commonEffects.setMainData());
  //   }
  // } catch (error) {
  //   dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  //   dispatch(actions.setProcessing(false));
  // }
};

// Пока не используется
export const changeCountVerb = ({ body }) => async dispatch => {
  // try {
  //   const response = await requestWithToken('post', '/api/irregular-verbs/changeCount', body);
  //   const { data } = response.data;
  //
  //   if (data.success) {
  //     dispatch(commonEffects.setMainData());
  //   }
  // } catch (error) {
  //   dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  //   dispatch(actions.setProcessing(false));
  // }
};
