import React from 'react';
import styled, { css } from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { Colors, DICTIONARIES_EMPTY_MODE } from '@constants';
import { EmptyProps, ArrowProps } from './interfaces';

// todo не работаю алиасы assets
import AddWordBackground from '../../../assets/images/add-word-background.png';
import AddDictBackground from '../../../assets/images/add-dict-background.png';

export const Empty: React.FC<EmptyProps> = ({ mode }) => {
  const isPreviewMode = mode === DICTIONARIES_EMPTY_MODE.PREVIEW;
  const text = isPreviewMode ? 'Добавьте слова для изучения' : 'Cоздайте свой первый словарь';

  return (
    <>
      <ImageBackground
        resizeMode={isPreviewMode ? 'stretch' : 'contain'}
        source={isPreviewMode ? AddWordBackground : AddDictBackground}
        style={{ width: '100%', height: '100%', top: isPreviewMode ? 60 : -110 }}
      />
      <Container>
        <Arrow source={require('../../../assets/images/add-arrow-icon.png')} isPreviewMode={isPreviewMode}></Arrow>
        <Text>{text}</Text>
      </Container>
    </>
  );
};

const Container = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Arrow = styled.Image<ArrowProps>`
  position: absolute;
  top: ${({ isPreviewMode }) => (isPreviewMode ? '20px' : '400px')};
  right: ${({ isPreviewMode }) => (isPreviewMode ? '60px' : '85px')};

  ${({ isPreviewMode }) =>
    !isPreviewMode &&
    css`
      transform: rotate(180deg) scale(-1, 1);
    `}
`;

const Text = styled.Text`
  text-align: center;
  color: ${Colors.white};
  font-family: Museo;
  font-size: 16px;
  font-style: italic;
`;
