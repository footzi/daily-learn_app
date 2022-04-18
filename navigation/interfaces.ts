import { SCREENS } from '@constants';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Словари
// todo Разобраться как сделать ключи через константы = [SCREENS.PREVIEW_DICTIONARY]
export type DictionaryStackParamList = {
  DictionariesList: undefined;
  PreviewDictionary: {
    preview_dictionary: {
      id: number;
      name: string;
    };
  };
};

export type PreviewDictionaryScreenRouteProp = RouteProp<DictionaryStackParamList, SCREENS.PREVIEW_DICTIONARY>;
export type PreviewDictionaryScreenNavigationProp = StackNavigationProp<
  DictionaryStackParamList,
  SCREENS.PREVIEW_DICTIONARY
>;

export type DictionariesListScreenNavigationProp = StackNavigationProp<
  DictionaryStackParamList,
  SCREENS.DICTIONARIES_LIST
>;

// @ts-ignore
export type SignInScreenNavigationProp = StackNavigationProp<undefined, SCREENS.SIGN_IN>;
// @ts-ignore
export type SignUpScreenNavigationProp = StackNavigationProp<undefined, SCREENS.SIGN_UP>;
// @ts-ignore
export type HomeScreenNavigationProp = StackNavigationProp<undefined, SCREENS.HOME>;

export interface SelectedDictionaryForTraining {
  id: number;
  name: string;
}

export type DictionaryTrainingStackParamList = {
  DictionaryTraining: SelectedDictionaryForTraining[];
};

export type DictionaryTrainingScreenRouteProp = RouteProp<
  DictionaryTrainingStackParamList,
  SCREENS.DICTIONARY_TRAINING
>;
export type DictionaryTrainingScreenNavigationProp = StackNavigationProp<
  DictionaryTrainingStackParamList,
  SCREENS.DICTIONARY_TRAINING
>;
