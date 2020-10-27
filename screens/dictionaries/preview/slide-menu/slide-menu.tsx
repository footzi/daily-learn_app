import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { NewColors as Colors } from '@constants';
import { ButtonIcon } from '@components';
import { SlideMenuProps } from '../interfaces';

export const SlideMenu: React.FC<SlideMenuProps> = ({ onMix, onFilter }) => (
  <Container>
    <ButtonIcon style={{ marginBottom: 35 }} onPress={onMix}>
      <Feather name="shuffle" size={24} color={Colors.white} />
    </ButtonIcon>
    <ButtonIcon onPress={onFilter}>
      <Feather name="filter" size={24} color={Colors.white} />
    </ButtonIcon>
  </Container>
);

const Container = styled.View`
  padding: 25px 10px 25px 15px;
  position: absolute;
  bottom: 40px;
  right: 0;
  z-index: 1;
  background-color: ${Colors.green};
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  elevation: 5;
  height: 130px;
  width: 48px;
`;
