export interface ModalProps {
  theme: string;
  isOpenModal: boolean;
  closeModal: () => void;
  title?: JSX.Element | string;
}

export interface UseModalResult {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

interface Theme {
  backgroundColor: string;
  titleColor: string;
  elevation: number;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
