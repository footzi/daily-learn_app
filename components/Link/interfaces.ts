import { TouchableWithoutFeedbackProps } from 'react-native';

export interface LinkProps extends TouchableWithoutFeedbackProps {
  theme: string;
  text: string;
}

interface Theme {
  color: string;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
