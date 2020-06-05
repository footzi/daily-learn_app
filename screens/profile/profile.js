import React from 'react';
import styled from 'styled-components/native';
import { Content } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonLoader, Title } from '@components';
import * as effects from './effects';

export const ProfileScreen = () => {
  const { profile = {} } = useSelector((state) => state);
  const { login, email, paws } = profile;
  const dispatch = useDispatch();

  const onSignOut = () => dispatch(effects.toSignOut());

  return (
    <Content>
      <Container>
        <Title>Профиль</Title>

        <List>
          <Item>Логин - {login}</Item>
          <Item>Электронная почта - {email}</Item>
          <Item>Лапки - {paws}</Item>
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
