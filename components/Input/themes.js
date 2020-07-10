import { rgba } from 'polished';
import { NewColors as Colors } from '@constants';

export const themes = {
  primary: {
    color: Colors.secondary,
    placeholderColor: rgba(Colors.secondary, 0.5),
    borderColor: rgba(Colors.secondary, 0.5),
    borderFocusColor: Colors.secondary,
    selectionColor: Colors.secondary,
  },
};
