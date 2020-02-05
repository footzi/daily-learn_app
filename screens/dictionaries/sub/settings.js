import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'native-base';

const SettingsDictionaryScreen = () => {
  return (
    <Container>
      <Text>Здесь пока ничего нет :(</Text>
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
`;

SettingsDictionaryScreen.navigationOptions = {
  title: 'Настройки'
};

export default SettingsDictionaryScreen;
