import React from 'react';
import styled from 'styled-components/native';
import { H3 } from 'native-base';
import { ProgressBar } from '@components';
import { SETTINGS } from '@constants';
import * as Animatable from 'react-native-animatable';

export const AskSlide = ({ animateRef, word }) => {
  return (
    <Slide>
      <Animatable.View ref={animateRef} useNativeDriver={true}>
        <H3 style={{ textAlign: 'center' }}>{word.question}</H3>

        <ProgressWrapper>
          <ProgressBar progress={(word.count / SETTINGS.attempt) * 100} />
        </ProgressWrapper>
      </Animatable.View>
    </Slide>
  );
};

const Slide = styled.View`
  width: 100%;
  flex-basis: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const ProgressWrapper = styled.View`
  margin-top: 20px;
`;
