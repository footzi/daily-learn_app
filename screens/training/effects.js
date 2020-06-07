import { ApiCall } from '@api';
import { ERROR } from '@constants';
import { actions } from '@store';
import * as commonEffects from '@store/common-effects';

export const saveCountWord = (body) => async (dispatch) => {
  try {
    const response = await ApiCall.changeCountWord(body);
    const { data, error } = response.data;
    const { success } = data;

    if (!success) {
      throw new Error(error);
    }

    dispatch(commonEffects.getMainData());
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};

// export const saveCountPaws = (cound) => async (dispatch) => {
//   try {
//     const response = await ApiCall.changeProfile(body);
//     const { data, error } = response.data;
//     const { success } = data;
//
//     if (!success) {
//       throw new Error(error);
//     }
//
//     // dispatch(commonEffects.getMainData());
//   } catch (error) {
//     dispatch(actions.setNotification({ type: ERROR, text: error.message }));
//   }
// };
