import React from 'react';
import styled from 'styled-components';

export const Title = ({ children, ...restProps }) => <View {...restProps}>{children}</View>;

const View = styled.Text`
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 20px;
  text-align: center;
`;
