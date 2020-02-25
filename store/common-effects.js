import { ERROR } from '@constants';
import { requestWithToken } from '@api';
import { actions } from './index';

export const getMainData = () => async dispatch => {
  dispatch(actions.setProcessing());

  try {
    const response = await requestWithToken('get', '/screens/home');
    const { data } = response.data;

    dispatch(actions.setData(data));
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};
