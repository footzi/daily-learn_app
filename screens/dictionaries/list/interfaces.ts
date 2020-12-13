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
  dict: {
    id: number;
    name: string;
  };
  isOpenModal: boolean;
  closeModal: () => void;
  onDelete: () => void;
}

export interface DeleteDictionaryEffect {
  id: number;
}
