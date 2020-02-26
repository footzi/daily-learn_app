import React from 'react';
import styled from 'styled-components';
import { CheckBox } from 'native-base';

export const Checkbox = ({ checked, text, onPress }) => (
  <>
    <CheckBox onPress={onPress} checked={checked} />
    <Item onPress={onPress}>
      <Name>{text}</Name>
    </Item>
  </>
);

const Item = styled.TouchableOpacity`
  padding-left: 15px;
  flex: 1;
`;

const Name = styled.Text`
  align-self: flex-start;
`;
