import { ERROR } from '@constants';
import { ApiCall } from '@api';
import { actions } from './index';

export const getMainData = () => async (dispatch) => {
  dispatch(actions.setProcessing());

  try {
    const response = await ApiCall.mainData();

    if (!response || !response.data) {
      throw new Error('Get main data error');
    }

    const { data } = response.data;
    const { user, dictionaries } = data;
    const { login, email, paws } = user;

    dispatch(actions.setDictionaries(dictionaries));
    dispatch(actions.setProfile({ login, email, paws }));
    dispatch(actions.setIsLoaded());
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};
