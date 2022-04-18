import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';

import { LinkProps } from './interfaces';
import { themes } from './themes';

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
