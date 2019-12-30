import { ERROR } from '@constants';
import { request, requestWithToken } from '@api';
import { actions } from './index';

export const getMainData = () => async dispatch => {
  try {
    const response = await requestWithToken('get', '/screens/home');
    const { data } = response.data;

    dispatch(actions.setData(data));
  } catch (error) {

    console.log(error);
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};
