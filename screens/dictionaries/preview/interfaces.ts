import { PreviewDictionaryScreenRouteProp, PreviewDictionaryScreenNavigationProp } from '@navigation/interfaces';
import { Word, Dictionary } from '@interfaces';

export interface PreviewScreenProps {
  navigation: PreviewDictionaryScreenNavigationProp;
  route: PreviewDictionaryScreenRouteProp;
}

export interface PreviewScreenItemProps {
  isHide: boolean;
}

export interface DeleteWordModalProps {
  isOpenModal: boolean;
  isLoading: boolean;
  closeModal: () => void;
  word: Word | null;
  onDeleteWord: () => void;
}

export interface AddWordModalProps {
  isOpenModal: boolean;
  isLoading: boolean;
  closeModal: () => void;
  onSaveWord: (fields: SaveFieldsWord) => void;
}

export interface SlideMenuProps {
  onMix: () => void;
  onFilter: () => void;
}

export interface PreviewTranslateWord {
  id: number;
  count: number;
  translate: string;
}

export interface NormalizedPreviewWord extends Word {
  translates: PreviewTranslateWord[];
}

export interface SaveTranslateField {
  id: number;
  value: string;
}

export interface SaveFieldsWord {
  name: string;
  translate: SaveTranslateField[];
}
