import { Dispatch } from 'react-redux';
import { NOTIFICATION_TYPES } from '@constants';
import { ApiCall } from '@api';
import { LOADING_ITEMS } from '@constants';
import { updateData } from '@store';
import * as actions from '@store';
import { SaveWordEffect, RemoveWordEffect } from './interfaces';

export const saveWord = ({ fields, preview_dictionary }: SaveWordEffect) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(actions.startLoading(LOADING_ITEMS.INNER));

  try {
    const body = {
      name: JSON.stringify([fields.name]),
      translate: JSON.stringify(fields.translate.map((item) => item.value)),
      dictionary_id: preview_dictionary.id,
    };

    const response = await ApiCall.saveWord(body);

    const { data, error } = response.data;
    const { success } = data;

    if (!success) {
      throw new Error(error);
    }

    dispatch(updateData());
  } catch (error) {
    dispatch(actions.setNotification({ type: NOTIFICATION_TYPES.ERROR, text: error.message }));
  } finally {
    dispatch(actions.endLoading(LOADING_ITEMS.INNER));
  }
};

export const removeWord = (ids: RemoveWordEffect) => async (dispatch: Dispatch): Promise<void> => {
  dispatch(actions.startLoading(LOADING_ITEMS.INNER));

  try {
    const response = await ApiCall.removeWord({ ids: JSON.stringify(ids) });
    const { data, error } = response.data;
    const { success } = data;

    if (!success) {
      throw new Error(error);
    }

    dispatch(updateData());
  } catch (error) {
    dispatch(actions.setNotification({ type: NOTIFICATION_TYPES.ERROR, text: error.message }));
  } finally {
    dispatch(actions.endLoading(LOADING_ITEMS.INNER));
  }
};
