import React from 'react';
import styled from 'styled-components';
import { NewColors as Colors } from '@constants';

export const Title = ({ children, ...restProps }) => <View {...restProps}>{children}</View>;

// margin-top: 30px;
// margin-bottom: 10px;
const View = styled.Text`
  font-size: 30px;
  font-family: Museo;
  text-align: center;
  color: ${Colors.white};
`;
