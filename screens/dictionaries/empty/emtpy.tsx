import React from 'react';
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { NewColors as Colors, DICTIONARIES_EMPTY_MODE } from '@constants';

export interface EmptyProps {
  mode: DICTIONARIES_EMPTY_MODE.PREVIEW | DICTIONARIES_EMPTY_MODE.LIST;
}

export interface ArrowProps {
  isPreviewMode: boolean;
}

// todo не работаю алиасы assets
import AddWordBackground from '../../../assets/images/add-word-background.png';
import AddDictBackground from '../../../assets/images/add-dict-background.png';
import AddDictBackground2 from '../../../assets/images/add-dict-background2.png';

// 80
export const Empty: React.FC<EmptyProps> = ({ mode }) => {
  const isPreviewMode = mode === DICTIONARIES_EMPTY_MODE.PREVIEW;

  const text = isPreviewMode ? 'Добавьте слова для изучения' : 'Cоздайте свой первый словарь';
  return (
    <ImageBackground
      resizeMode="stretch"
      source={isPreviewMode ? AddWordBackground : AddDictBackground}
      style={{ width: '100%', height: '100%', top: -80 }}>
      <Container>
        <Arrow source={require('../../../assets/images/add-arrow-icon.png')} isPreviewMode={isPreviewMode}></Arrow>
        <Text>{text}</Text>
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

//right: 50px;
const Arrow = styled.Image<ArrowProps>`
  position: absolute;
  top: ${({ isPreviewMode }) => (isPreviewMode ? '-60px' : '0')};
  right: ${({ isPreviewMode }) => (isPreviewMode ? '50px' : '0')};
`;

const Text = styled.Text`
  text-align: center;
  top: -80px;
  color: ${Colors.white};
  font-family: Museo;
  font-size: 16px;
  font-style: italic;
`;
