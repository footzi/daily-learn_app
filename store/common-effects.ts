import { NOTIFICATION_TYPES, LOADING_ITEMS } from '@constants';
import { ApiCall } from '@api';
import * as actions from './actions';

const getData = async () => {
  const response = await ApiCall.mainData();

  if (!response || !response.data) {
    throw new Error('Get main data error');
  }

  const { data } = response.data;
  const { user, dictionaries } = data;

  return { user, dictionaries };
};

export const loadingData = () => async (dispatch) => {
  dispatch(actions.startLoading(LOADING_ITEMS.FIRST));

  try {
    const { user, dictionaries } = await getData();
    const { login, email, paws } = user;

    dispatch(actions.setDictionaries(dictionaries));
    dispatch(actions.setProfile({ login, email, paws }));
  } catch (error) {
    dispatch(actions.setNotification({ type: NOTIFICATION_TYPES.ERROR, text: error.message }));
  } finally {
    dispatch(actions.endLoading(LOADING_ITEMS.FIRST));
  }
};

export const updateData = () => async (dispatch) => {
  try {
    const { user, dictionaries } = await getData();
    const { login, email, paws } = user;

    dispatch(actions.setDictionaries(dictionaries));
    dispatch(actions.setProfile({ login, email, paws }));
  } catch (error) {
    dispatch(actions.setNotification({ type: NOTIFICATION_TYPES.ERROR, text: error.message }));
  }
};
