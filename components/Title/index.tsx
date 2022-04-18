import { Colors } from '@constants';
import React from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';

export const Title: React.FC<TextProps> = ({ children, ...restProps }) => <View {...restProps}>{children}</View>;

const View = styled.Text`
  font-size: 30px;
  font-family: Museo;
  text-align: center;
  color: ${Colors.white};
`;
