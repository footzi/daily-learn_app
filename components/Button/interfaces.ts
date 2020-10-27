export interface ButtonsProps {
  theme: string;
  text: number;
  disabled?: boolean;
  useLoader?: boolean;
  onPress: () => void;
};

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