import React from 'react';
import styled from 'styled-components/native';

export const ButtonIcon = ({ onPress, children, style = {} }) => (
  <View onPress={onPress} activeOpacity={0.5} style={style}>
    {children}
  </View>
);

const View = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
