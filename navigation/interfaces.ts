import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SCREENS } from '@constants';

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
