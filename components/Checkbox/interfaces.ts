export interface CheckboxProps {
  theme: string;
  isChecked: boolean;
  onPress: () => void;
}

interface Theme {
  borderColor: string;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
