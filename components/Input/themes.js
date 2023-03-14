import { rgba } from 'polished';
import { NewColors as Colors } from '@constants';

export const themes = {
  primary: {
    color: Colors.dust,
    placeholderTextColor: rgba(Colors.dust, 0.7),
    backgroundColor: Colors.light,
    borderColor: Colors.light,
    borderFocusColor: Colors.light,
    borderWidth: 1,
    borderRadius: 24,
    fontFamily: 'RobotoRegular',
    fontSize: 14,
    paddingTop: 6,
    paddingRight: 16,
    paddingBottom: 6,
    paddingLeft: 16,
    selectionColor: Colors.primary,
  },
  secondary: {
    color: Colors.secondary,
    placeholderTextColor: rgba(Colors.secondary, 0.5),
    borderColor: rgba(Colors.secondary, 0.5),
    borderFocusColor: rgba(Colors.secondary, 0.5),
  },
  bordered: {
    color: Colors.white,
    borderBottomWidth: 1,
    borderColor: rgba(Colors.white, 0.6),
    borderFocusColor: Colors.white,
    placeholderTextColor: rgba(Colors.white, 0.7),
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    width: '100%',
  },
};
