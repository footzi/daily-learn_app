

export interface CheckboxProps = {
  theme: 'primary' | 'secondary';
  isChecked: boolean;
  onPress: () => void;
};

type ContainerProps = {
  theme: themes.primary | themes.secondary;
};