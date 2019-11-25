import { ERROR } from '@constants';
import { requestWithToken } from '@api';
import { actions } from './index';

export const setMainData = () => async dispatch => {
  try {
    const response = await requestWithToken('get', '/screens/home');
    const { data } = response.data;
  
    dispatch(actions.setData(data));
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  }
};

// export const clearMainData = () => dispatch => {
//   dispatch(actions.setData(''));
// };
