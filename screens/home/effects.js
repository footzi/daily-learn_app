import { normalizeDictionaries } from './normalize';
import { actions } from '@store';
import { SCREENS } from '@constants';

export const setDictionaries = (data) => (dispatch) => {
  const { dictionaries } = data;
  const normalized = normalizeDictionaries(dictionaries);

  dispatch(actions.setHomeScreen({ dictionaries: normalized }));
};

export const selectDictionary = (id) => (dispatch, getState) => {
  const { homeScreen } = getState();
  const { dictionaries } = homeScreen;

  const selected = dictionaries.map((item) => {
    if (id === item.id) {
      item.checked = !item.checked;
    }

    return item;
  });

  dispatch(actions.setHomeScreen({ dictionaries: selected }));
};

export const startTraining = (navigation) => (dispatch, getState) => {
  const { homeScreen } = getState();
  const { dictionaries } = homeScreen;

  const selectedDictionaries = dictionaries.filter((item) => item.checked).map((dict) => dict.id);

  navigation.navigate(SCREENS.DICTIONARY_TRAINING, { selectedDictionaries });
};
