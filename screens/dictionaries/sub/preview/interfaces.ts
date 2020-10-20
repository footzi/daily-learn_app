import { Word } from '../../interfaces';

export interface PreviewScreenProps {
  navigation: object;
  route: object;
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

export interface SlideMenuProps {
  onMix: () => void;
  onFilter: () => void;
}
