import React from 'react';
import styled from 'styled-components/native';
import { Content } from 'native-base';
import { useDispatch } from 'react-redux';
import { ButtonLoader, Title } from '@components';
import * as effects from './effects';

export const SettingsScreen = () => {
  const dispatch = useDispatch();

  const onSignOut = () => dispatch(effects.toSignOut());

  return (
    <Content>
      <Container>
        <Title>Настройки</Title>
        <ButtonLoader warning onPress={onSignOut} name="Выйти" width={100} />
      </Container>
    </Content>
  );
};

const Container = styled.View`
  padding: 10px;
`;
