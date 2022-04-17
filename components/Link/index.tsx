import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';
import { themes } from './themes';
import { LinkProps } from './interfaces';

export const Link: React.FC<LinkProps> = ({ theme = 'primary', text, onPress }) => (
  <ThemeProvider theme={themes[theme]}>
    <TouchableWithoutFeedback onPress={onPress}>
      <Text>{text}</Text>
    </TouchableWithoutFeedback>
  </ThemeProvider>
);

// @ts-ignore
export const Text = styled.Text`
  font-family: Museo;
  font-size: 16px;
  font-weight: normal;
  color: ${({ theme }) => theme.color};
`;
