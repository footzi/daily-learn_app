import { DICTIONARIES_EMPTY_MODE } from '@constants';

export interface EmptyProps {
  mode: DICTIONARIES_EMPTY_MODE.PREVIEW | DICTIONARIES_EMPTY_MODE.LIST;
}

export interface ArrowProps {
  isPreviewMode: boolean;
}