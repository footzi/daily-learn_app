import { Dictionary } from '@interfaces';
import { HomeScreenNavigationProp } from '@navigation';

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export interface DictionaryItemProps {
  isChecked: boolean;
}

export interface NormalizedPreviewDictionary extends Dictionary {
  isChecked: boolean;
}
