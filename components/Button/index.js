import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { TouchableNativeFeedback } from 'react-native';
import { themes } from './themes';
import { Spinner } from '../Spinner';

export const Button = ({
  theme = 'primary',
  text = '',
  disabled = false,
  useLoader = false,
  onPress = () => {},
  ...restProps
}) => {
  return (
    <ThemeProvider theme={themes[theme]}>
      <Container disabled={disabled} {...restProps}>
        <TouchableNativeFeedback
          onPress={onPress}
          disabled={disabled}
          background={TouchableNativeFeedback.Ripple(themes[theme].feedback)}>
          <Inner>{useLoader ? <Spinner color={themes[theme].loaderColor} size="small" /> : <Text>{text}</Text>}</Inner>
        </TouchableNativeFeedback>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.View`
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
