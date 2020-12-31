import { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  theme: string;
  paddingRight?: number;
}
