import { Word } from '@interfaces';

export interface saveCountWordEffectProps {
  id: number;
  type: string;
}

export interface saveCountPawsEffectProps {

}

// export interface CreateWordProps {
//
// }

export interface CreatedForTrainingWord extends Word {
  type: 'name' | 'translate';
  count: number;
  isShow: boolean;
}
