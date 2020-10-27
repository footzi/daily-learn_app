import React from 'react';
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { NewColors as Colors } from '@constants';

export const Empty: React.FC = () => {
  return (
    <ImageBackground
      resizeMode="stretch"
      source={require('../../../assets/images/add-word-background.png')}
      style={{ width: '100%', height: '100%', top: 80 }}>
      <Container>
        <Arrow source={require('../../../assets/images/add-arrow-icon.png')}></Arrow>
        <Text>Добавьте слова для изучения</Text>
      </Container>
    </ImageBackground>
  );
};

const Container = styled.View`
  position: relative;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Arrow = styled.Image`
  position: absolute;
  top: -60px;
  right: 50px;
`;

const Text = styled.Text`
  text-align: center;
  top: -80px;
  color: ${Colors.white};
  font-family: Museo;
  font-size: 16px;
  font-style: italic;
`;
