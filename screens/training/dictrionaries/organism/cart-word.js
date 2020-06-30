import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { Card, Item, Input, Button, Text, View, H3, Icon } from 'native-base';
import { ProgressBar } from '@components';
import { SETTINGS, PAWS_DURATION, Colors } from '@constants';
import { getNextIndex } from '../helpers';

const zoomOut = {
  0: {
    translateY: 0,
  },
  0.9: {
    opacity: 1,
  },
  1: {
    opacity: 0,
    translateY: 280,
  },
};

const zoomIn = {
  0: {
    opacity: 1,
    translateY: 280,
  },
  0.9: {
    opacity: 1,
  },
  1: {
    opacity: 0,
    translateY: 0,
  },
};

export const CartWord = ({
  words = [],
  paws = 0,
  startIndex = 1,
  onUpdateWords = () => {},
  onUpdatePaws = () => {},
  onFinished = () => {},
  navigation = {},
}) => {
  const [field, setField] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const pawRef = useRef(null);

  const currentWord = words[currentIndex];

  const onChange = (text) => setField(text);

  const onNotRemember = () => {
    setField('');
    setIsWrong(true);
    pawRef.current.animate(zoomOut, PAWS_DURATION);
    onUpdatePaws(-1);
  };

  const onAnswer = () => {
    const isRight = currentWord.answers.some((item) => item.toLowerCase() === field.toLowerCase().trim());

    if (isRight) {
      pawRef.current.animate(zoomIn, PAWS_DURATION).then(() => onUpdatePaws(1));
      onUpdateWords(currentWord);
      onNext();
    } else {
      pawRef.current.animate(zoomOut, PAWS_DURATION);
      setIsWrong(true);
      onUpdatePaws(-1);
    }

    setField('');
  };

  const onNext = () => {
    const nextIndex = getNextIndex(words, currentIndex);

    setIsWrong(false);

    if (nextIndex !== null) {
      setCurrentIndex(nextIndex);
    } else {
      onFinished();
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Paw>
          <PawAnimate>
            <Animatable.View ref={pawRef} easing="ease-in-out" useNativeDriver>
              <Icon name="md-paw" style={{ color: isWrong ? Colors.danger : Colors.success }} />
              <Count>{isWrong ? '-1' : '+1'}</Count>
            </Animatable.View>
          </PawAnimate>

          <PawStatic>
            <Icon name="md-paw" style={{ color: isWrong ? Colors.danger : Colors.success }} />
            <Count isStatic>{paws}</Count>
          </PawStatic>
        </Paw>
      ),
    });
  }, [navigation, paws, isWrong]);

  return (
    <Card>
      <Content>
        <H3 style={{ textAlign: 'center' }}>{currentWord.question}</H3>

        <ProgressWrapper>
          <ProgressBar progress={(currentWord.count / SETTINGS.attempt) * 100} />
        </ProgressWrapper>

        <Actions>
          {!isWrong && (
            <>
              <Answer>
                <Item>
                  <Input
                    placeholder="Введите ответ"
                    onChangeText={onChange}
                    onSubmitEditing={onAnswer}
                    value={field}
                    autoFocus={true}
                  />
                </Item>
              </Answer>

              <Wrong>
                <Button danger transparent onPress={onNotRemember}>
                  <Text>Не помню :(</Text>
                </Button>
              </Wrong>
            </>
          )}

          {isWrong && (
            <RightAnswer>
              {currentWord.answers.map((item, index) => (
                <ItemAnswer key={index}>{item}</ItemAnswer>
              ))}
            </RightAnswer>
          )}
        </Actions>

        <Buttons>
          {!isWrong && (
            <>
              <Button warning onPress={onFinished} style={{ width: 120 }}>
                <Text style={{ flex: 1, textAlign: 'center' }}>Завершить</Text>
              </Button>
              <Button success={!!field} disabled={!field} onPress={onAnswer} style={{ width: 120 }}>
                <Text style={{ flex: 1, textAlign: 'center' }}>Ответить</Text>
              </Button>
            </>
          )}

          {isWrong && (
            <Button success onPress={onNext} style={{ flex: 1 }}>
              <Text style={{ flex: 1, textAlign: 'center' }}>Запомнил</Text>
            </Button>
          )}
        </Buttons>
      </Content>
    </Card>
  );
};

const ProgressWrapper = styled.View`
  margin-top: 20px;
`;

const Content = styled.View`
  padding: 20px;
`;

const Actions = styled.View`
  min-height: 130px;
`;

const Answer = styled.View`
  margin-top: 20px;
`;

const Wrong = styled.View`
  margin-top: 5px;
  flex-direction: row;
  justify-content: flex-end;
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RightAnswer = styled.View`
  justify-content: center;
  flex: 1;
`;

const ItemAnswer = styled.Text`
  font-size: 26px;
  font-weight: 500;
  text-align: center;
  color: ${Colors.danger};
`;

const Paw = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  z-index: 1;
  padding-right: 40px;
`;

const PawStatic = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const PawAnimate = styled.View`
  position: absolute;
  top: 14px;
  left: 0;
  z-index: 1;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Count = styled.Text`
  font-size: 16px;
  margin-left: 5px;
  z-index: 2;
  position: absolute;
  left: 20px;
  min-width: 50px;
  background-color: ${({ isStatic }) => (isStatic ? Colors.white : 'transparent')};
`;
