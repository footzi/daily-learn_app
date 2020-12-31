import { rgba } from 'polished';
import { Colors } from '@constants';

export const themes = {
  primary: {
    color: Colors.primary,
    placeholderColor: rgba(Colors.primary, 0.5),
    borderColor: rgba(Colors.primary, 0.5),
    borderFocusColor: Colors.primary,
    selectionColor: Colors.primary,
  },
  secondary: {
    color: Colors.secondary,
    placeholderColor: rgba(Colors.secondary, 0.5),
    borderColor: rgba(Colors.secondary, 0.5),
    borderFocusColor: Colors.secondary,
    selectionColor: Colors.secondary,
  },
};
