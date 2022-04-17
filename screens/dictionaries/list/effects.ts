// import { Dispatch, GetState } from 'react-redux';
// import { NOTIFICATION_TYPES } from '@constants';
// import { ApiCall } from '@api';
// import { SCREENS, LOADING_ITEMS } from '@constants';
// import { updateData } from '@store';
// import { Dictionary } from '@interfaces';
// import * as actions from '@store';
// import { CreateDictionaryEffect, DeleteDictionaryEffect } from './interfaces';
//
// export const createDictionary = ({ navigation, name }: CreateDictionaryEffect) => async (
//   dispatch: Dispatch,
//   getState: GetState
// ): Promise<void> => {
//   dispatch(actions.startLoading(LOADING_ITEMS.INNER));
//
//   try {
//     const response = await ApiCall.createDictionary({ name });
//     const { data, error } = response.data;
//     const { success, id } = data;
//     if (!success) {
//       throw new Error(error);
//     }
//
//     await dispatch(updateData());
//
//     const state = getState();
//     const { dictionaries } = state;
//     const preview_dictionary = dictionaries.find((item: Dictionary) => item.id === id);
//
//     navigation.navigate(SCREENS.PREVIEW_DICTIONARY, { preview_dictionary });
//   } catch (error) {
//     dispatch(actions.setNotification({ type: NOTIFICATION_TYPES.ERROR, text: error.message }));
//   } finally {
//     dispatch(actions.endLoading(LOADING_ITEMS.INNER));
//   }
// };
//
// export const deleteDictionary = ({ id }: DeleteDictionaryEffect) => async (dispatch: Dispatch): Promise<void> => {
//   dispatch(actions.startLoading(LOADING_ITEMS.INNER));
//
//   try {
//     const response = await ApiCall.deleteDictionary({ id });
//     const { data, error } = response.data;
//     const { success } = data;
//     if (!success) {
//       throw new Error(error);
//     }
//
//     await dispatch(updateData());
//   } catch (error) {
//     dispatch(actions.setNotification({ type: NOTIFICATION_TYPES.ERROR, text: error.message }));
//   } finally {
//     dispatch(actions.endLoading(LOADING_ITEMS.INNER));
//   }
// };
