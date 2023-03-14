import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';
import { themes } from './themes';
import { Spinner } from '../Spinner';

export const Button = ({
  theme = 'primary',
  text = '',
  isDisabled = false,
  isLoading = false,
  onPress = () => {},
  ...restProps
}) => {
  const currentTheme = themes[theme];

  return (
    <ThemeProvider theme={currentTheme}>
      <Container disabled={isDisabled} {...restProps}>
        <TouchableNativeFeedback
          onPress={onPress}
          disabled={isDisabled}
          background={TouchableNativeFeedback.Ripple(currentTheme.feedback)}>
          <Inner>{isLoading ? <Spinner color={currentTheme.loaderColor} size={30} /> : <Text>{text}</Text>}</Inner>
        </TouchableNativeFeedback>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
  elevation: ${({ theme }) => theme.elevation};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  height: 36px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.borderColor};
  border-radius: 24px;
  overflow: hidden;
`;

const Inner = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.color};
  font-size: 14px;
  font-family: RobotoRegular;
  padding-left: 20px;
  padding-right: 20px;
`;
