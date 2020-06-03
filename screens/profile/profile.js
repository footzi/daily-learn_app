import React from 'react';
import styled from 'styled-components/native';
import { Content } from 'native-base';
import { useDispatch } from 'react-redux';
import { ButtonLoader, Title } from '@components';
import * as effects from './effects';

export const ProfileScreen = () => {
  const dispatch = useDispatch();

  const onSignOut = () => dispatch(effects.toSignOut());

  return (
    <Content>
      <Container>
        <Title>Профиль</Title>

        <List>
          <Item>Логин - Владик</Item>
          <Item>Электронная почта - test@tets.com</Item>
          <Item>Лапки - 100</Item>
        </List>

        <ButtonLoader warning onPress={onSignOut} name="Выйти" width={100} />
      </Container>
    </Content>
  );
};

const Container = styled.View`
  padding: 10px;
`;

const List = styled.View`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Item = styled.Text`
  margin-bottom: 5px;
  font-size: 18px;
`;
