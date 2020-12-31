import React from 'react';
import styled from 'styled-components';
import { Colors } from '@constants';

export const Title = ({ children, ...restProps }) => <View {...restProps}>{children}</View>;

const View = styled.Text`
  font-size: 30px;
  font-family: Museo;
  text-align: center;
  color: ${Colors.white};
`;
