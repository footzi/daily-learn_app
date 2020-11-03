import { PreviewDictionaryScreenRouteProp, PreviewDictionaryScreenNavigationProp } from '@navigation/interfaces';
import { Word } from '../../interfaces';

export interface PreviewScreenProps {
  navigation: PreviewDictionaryScreenNavigationProp;
  route: PreviewDictionaryScreenRouteProp;
}

export interface PreviewScreenItemProps {
  isHide: boolean;
}

export interface DeleteWordModalProps {
  word: Word | null;
  isOpenModal: boolean;
  closeModal: () => void;
  onDeleteWord: () => void;
}

export interface AddWordModalProps {
  isOpenModal: boolean;
  closeModal: () => void;
  onSaveWord: (fields: SaveFieldsWord) => void;
}

export interface SlideMenuProps {
  onMix: () => void;
  onFilter: () => void;
}

export interface SaveTranslateField {
  id: number;
  value: string;
}

export interface SaveFieldsWord {
  name: string;
  translate: SaveTranslateField[];
}
