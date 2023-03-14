import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native';
import { themes } from './themes';

export const Link = ({ theme = 'primary', text = '', onPress = () => {} }) => (
  <ThemeProvider theme={themes[theme]}>
    <TouchableWithoutFeedback onPress={onPress}>
      <Text>{text}</Text>
    </TouchableWithoutFeedback>
  </ThemeProvider>
);

export const Text = styled.Text`
  font-family: RobotoRegular;
  font-size: 16px;
  font-weight: normal;
  color: ${({ theme }) => theme.color};
`;
