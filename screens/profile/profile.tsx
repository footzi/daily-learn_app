import React from 'react';
import styled from 'styled-components/native';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@components';
import { Colors, LOADING_ITEMS } from '@constants';
import { InitStateInterface } from '@store';
import * as effects from './effects';

export const ProfileScreen: React.FC = () => {
  const { profile, loading } = useSelector((state: InitStateInterface) => state);
  const { login, paws } = profile;
  const isLoading = loading[LOADING_ITEMS.INNER];
  const dispatch = useDispatch();

  const onSignOut = () => dispatch(effects.toSignOut());

  return (
    <Container>
      <Camera>
        <EvilIcons name="camera" size={80} color={Colors.white} />
      </Camera>

      <Login>{login}</Login>

      <Balance>
        <FontAwesome name="paw" size={25} color={Colors.green} />
        <Count>{paws}</Count>
      </Balance>

      <Bottom>
        <Button theme="primary" text="Выйти из приложения" onPress={onSignOut} useLoader={isLoading} width={230} />
      </Bottom>
    </Container>
  );
};

const Container = styled.View`
  padding: 30px;
  align-items: center;
  height: 100%;
`;

const Camera = styled.View`
  width: 124px;
  height: 124px;
  background-color: ${Colors.primary};
  align-items: center;
  justify-content: center;
  border-radius: 62px;
`;

const Login = styled.Text`
  margin-top: 30px;
  font-size: 24px;
  font-family: Museo;
  color: ${Colors.primary};
`;

const Balance = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

const Count = styled.Text`
  font-size: 20px;
  font-family: Museo;
  color: ${Colors.green};
  margin-left: 7px;
`;

const Bottom = styled.View`
  margin-top: auto;
  justify-content: flex-end;
`;
