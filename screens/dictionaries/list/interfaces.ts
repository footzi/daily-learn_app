import { DictionariesListScreenNavigationProp } from '@navigation';

export interface DictionariesListScreenProps {
  navigation: DictionariesListScreenNavigationProp;
}

export interface CreateDictModalProps {
  isOpenModal: boolean;
  isLoading: boolean;
  closeModal: () => void;
  onCreate: (name: string) => void;
}

export interface DeleteDictModalProps {
  isOpenModal: boolean;
  isLoading: boolean;
  closeModal: () => void;
  dict: {
    id: number;
    name: string;
  };
  onDelete: () => void;
}
