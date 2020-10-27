import { DictionariesListScreenNavigationProp } from '@navigation/interfaces';

export interface DictionariesListScreenProps {
  navigation: DictionariesListScreenNavigationProp;
}

export interface CreateDictModalProps {
  isOpenModal: boolean;
  closeModal: () => void;
  onCreate: (name: string) => void;
}
