import { ERROR, LOADING_ITEMS } from '@constants';
import { ApiCall } from '@api';
import { setDictionaries, setProfile, setNotification, startLoading, endLoading } from './actions';

// const getData = () => {
//
// }

export const loadingData = () => async (dispatch) => {
  // dispatch(actions.setProcessing());
  dispatch(startLoading(LOADING_ITEMS.FIRST));

  try {
    const response = await ApiCall.mainData();

    if (!response || !response.data) {
      throw new Error('Get main data error');
    }

    const { data } = response.data;
    const { user, dictionaries } = data;
    const { login, email, paws } = user;

    dispatch(setDictionaries(dictionaries));
    dispatch(setProfile({ login, email, paws }));
    // dispatch(actions.setIsLoaded());
  } catch (error) {
    dispatch(setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(endLoading(LOADING_ITEMS.FIRST));
    // dispatch(actions.removeProcessing());
  }
};

export const updateData = () => async (dispatch) => {
  try {
    const response = await ApiCall.mainData();

    if (!response || !response.data) {
      throw new Error('Get main data error');
    }

    const { data } = response.data;
    const { user, dictionaries } = data;
    const { login, email, paws } = user;

    dispatch(setDictionaries(dictionaries));
    dispatch(setProfile({ login, email, paws }));
  } catch (error) {
    dispatch(setNotification({ type: ERROR, text: error.message }));
  }
};
