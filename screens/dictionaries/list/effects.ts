import { Dispatch, GetState } from 'react-redux';
import { ERROR } from '@constants';
import { ApiCall } from '@api';
import { SCREENS, LOADING_ITEMS } from '@constants';
import { updateData } from '@store/common-effects';
import { Dictionary } from '@store';
import * as actions from '@store';
import { CreateDictionaryEffect } from './interfaces';

export const createDictionary = ({ navigation, name, closeModal }: CreateDictionaryEffect) => async (
  dispatch: Dispatch,
  getState: GetState
): Promise<void> => {
  dispatch(actions.startLoading(LOADING_ITEMS.INNER));

  try {
    const response = await ApiCall.createDictionary({ name });
    const { data, error } = response.data;
    const { success, id } = data;
    if (!success) {
      throw new Error(error);
    }

    await dispatch(updateData());

    const state = getState();
    const { dictionaries } = state;
    const preview_dictionary = dictionaries.find((item: Dictionary) => item.id === id);

    closeModal();
    navigation.navigate(SCREENS.PREVIEW_DICTIONARY, { preview_dictionary });
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.endLoading(LOADING_ITEMS.INNER));
  }
};
