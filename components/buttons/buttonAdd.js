import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export const ButtonAdd = ({ onPress }) => (
  <View onPress={onPress}>
    <Ionicons name="md-add" size={26} color={Colors.white} />
  </View>
);

const View = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border: 2px solid ${Colors.success};
  background-color: ${Colors.success};
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;
