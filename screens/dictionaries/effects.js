import { requestWithToken } from '@api';
import { ERROR } from '@constants';
import { actions } from '@store';
import { SCREENS } from '@constants';
import { shuffleArray } from '@libs';
import * as commonEffects from '@store/common-effects';

export const createDictionary = ({ navigation, body, closeModal }) => async (dispatch, getState) => {
  dispatch(actions.setProcessing());

  try {
    const response = await requestWithToken('post', '/api/dictionary/create', body);
    const { data } = response.data;
    const { success, id } = data;

    if (!success) {
      throw new Error();
    }

    await dispatch(commonEffects.getMainData());

    const state = getState();
    const { dictionaries } = state.data;
    const preview_dictionary = dictionaries.find(item => item.id === id);

    closeModal();
    navigation.navigate(SCREENS.PREVIEW_DICTIONARY, { preview_dictionary }); //NAVIGATION_PARAMS.preview_dictionary
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};

export const setDictionaryWords = words => dispatch => {
  dispatch(actions.setDictionaryWords(words));
};

export const saveWord = ({ fields, dictionary }) => async (dispatch, getState) => {
  dispatch(actions.setProcessing());

  const { dictionariesScreen } = getState();
  const { dictionaryWords } = dictionariesScreen;

  try {
    const newWord = {
      id: dictionaryWords[dictionaryWords.length - 1].id + 1,
      en: { name: fields.en },
      ru: { name: fields.ru.map(item => item.value) }
    };

    dispatch(actions.setDictionaryWords([...dictionaryWords, newWord]));

    const body = {
      ru: fields.ru.map(item => item.value).join(','),
      en: fields.en,
      dictionary_id: dictionary.id
    };

    const response = await requestWithToken('post', '/api/words/create', body);
    const { data } = response.data;

    if (data.success) {
      dispatch(commonEffects.getMainData());
    }
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};

export const setMixDictionaryWords = isMix => (dispatch, getState) => {
  const { dictionariesScreen } = getState();
  const { dictionaryWords } = dictionariesScreen;

  const words = isMix ? shuffleArray(dictionaryWords) : dictionaryWords.sort((a, b) => a.id - b.id);

  dispatch(setDictionaryWords(words));
};

export const removeWord = (id) => async (dispatch, getState) => {
  dispatch(actions.setProcessing());

  const { dictionariesScreen } = getState();
  const { dictionaryWords } = dictionariesScreen;

  try {
    const response = await requestWithToken('delete', '/api/words/delete', { ids: id });
    const { data } = response.data;

    // if (data.success) {
    //   dispatch(commonEffects.getMainData());
    // }
  } catch (error) {
    dispatch(actions.setNotification({ type: ERROR, text: error.message }));
  } finally {
    dispatch(actions.removeProcessing());
  }
};
