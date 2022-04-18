import { Word } from '@interfaces';
import { DictionaryTrainingScreenNavigationProp, DictionaryTrainingScreenRouteProp } from '@navigation';

export interface DictionaryTrainingScreenProps {
  route: DictionaryTrainingScreenRouteProp;
  navigation: DictionaryTrainingScreenNavigationProp;
}

export interface CreatedForTrainingWord extends Word {
  uid: number;
  type: 'name' | 'translate';
  count: number;
  question: string;
  isShow: boolean;
  answers: string[];
}

export type CreatedForTrainingWords = CreatedForTrainingWord[];

export interface CartWordProps {
  words: CreatedForTrainingWords;
  paws: number;
  startIndex: number;
  onUpdateWords(CreatedForTrainingWord): void;
  onUpdatePaws(number): void;
  onFinished(): void;
  navigation: DictionaryTrainingScreenNavigationProp;
}

export interface CountPawsProps {
  isWrong: boolean;
  isStatic?: boolean;
}
