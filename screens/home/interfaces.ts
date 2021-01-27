import { HomeScreenNavigationProp } from '@navigation/interfaces';
import { Dictionary } from '@interfaces';

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export interface DictionaryItemProps {
  isChecked: boolean;
}

export interface NormalizedPreviewDictionary extends Dictionary {
  isChecked: boolean;
}
