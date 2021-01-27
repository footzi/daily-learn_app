import { StyleProp, ViewStyle } from 'react-native';

export interface AnimationUnMountableProps {
  isMounted: boolean;
  animation: string;
  duration?: number;
  umountAnimation: string;
  umountDuration?: number;
  style?: StyleProp<ViewStyle>;
}
