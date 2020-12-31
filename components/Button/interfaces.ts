import { TouchableNativeFeedbackProps } from 'react-native';

export interface ButtonsProps extends TouchableNativeFeedbackProps {
  theme: string;
  text: string;
  width?: number;
  useLoader?: boolean;
}

export interface ContainerProps {
  disabled?: boolean;
}

interface Theme {
  backgroundColor: string;
  color: string;
  feedback: string;
  loaderColor: string;
  elevation: number;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
