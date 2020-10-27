import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';
import { themes } from './themes';
import { Spinner } from '../Spinner';
import { ButtonsProps, ContainerProps } from './interfaces';

export const Button: React.FC<ButtonsProps> = ({
  theme = 'primary',
  text = '',
  disabled = false,
  useLoader = false,
  onPress,
  ...restProps
}) => {
  const currentTheme = themes[theme];
  return (
    <ThemeProvider theme={currentTheme}>
      <Container disabled={disabled} {...restProps}>
        <TouchableNativeFeedback
          onPress={onPress}
          disabled={useLoader || disabled}
          background={TouchableNativeFeedback.Ripple(currentTheme.feedback)}>
          <Inner>{useLoader ? <Spinner color={currentTheme.loaderColor} size={30} /> : <Text>{text}</Text>}</Inner>
        </TouchableNativeFeedback>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.View<ContainerProps>`
  justify-content: center;
  background-color: ${({ theme }) => theme.backgroundColor};
  elevation: ${({ theme }) => theme.elevation};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  height: 37px;
  border-radius: 12px;
  overflow: hidden;
`;

const Inner = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.color};
  font-size: 16px;
  font-family: Museo;
  padding-left: 20px;
  padding-right: 20px;
`;
