import { DictionariesListScreenNavigationProp } from '@navigation/interfaces';

export interface DictionariesListScreenProps {
  navigation: DictionariesListScreenNavigationProp;
}

export interface CreateDictModalProps {
  isOpenModal: boolean;
  closeModal: () => void;
  onCreate: (name: string) => void;
}

export interface CreateDictionaryEffect {
  navigation: DictionariesListScreenNavigationProp;
  name: string;
}

export interface DeleteDictModalProps {
  isOpenModal: boolean;
  closeModal: () => void;
  dict: {
    id: number;
    name: string;
  };
  onDelete: () => void;
}

export interface DeleteDictionaryEffect {
  id: number;
}
