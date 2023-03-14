import React from 'react';
import styled from 'styled-components';
import { NewColors as Colors } from '@constants';

export const Title = ({ children, ...restProps }) => <View {...restProps}>{children}</View>;

const View = styled.Text`
  font-size: 20px;
  font-family: 'RobotoBold';
  text-align: center;
  color: ${Colors.grey};
`;
