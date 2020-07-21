import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { Input, Button, Link } from '@components';
import { PAWS_DURATION, NewColors as Colors } from '@constants';
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
          <Animatable.View ref={pawRef} easing="ease-in-out" useNativeDriver>
            <PawAnimate>
              <FontAwesome name="paw" size={25} color={isWrong ? Colors.danger : Colors.green} />
              <Count isWrong={isWrong}>{isWrong ? '-1' : '+1'}</Count>
            </PawAnimate>
          </Animatable.View>

          <PawStatic>
            <FontAwesome name="paw" size={25} color={isWrong ? Colors.danger : Colors.green} />
            <Count isWrong={isWrong}>{paws}</Count>
          </PawStatic>
        </Paw>
      ),
    });
  }, [navigation, paws, isWrong]);

  return (
    <Container>
      <Wrapper>
        <Question>{currentWord.question}</Question>

        <Actions>
          {isWrong ? (
            <RightAnswer>
              {currentWord.answers.map((item, index) => (
                <ItemAnswer key={index}>{item}</ItemAnswer>
              ))}
            </RightAnswer>
          ) : (
            <>
              <Field>
                <Input
                  theme="primary"
                  onChangeText={onChange}
                  onSubmitEditing={onAnswer}
                  value={field}
                  autoFocus={true}
                />
              </Field>
              <NotRememberButton>
                <Link theme="primary" text="Не помню :(" onPress={onNotRemember} />
              </NotRememberButton>
            </>
          )}
        </Actions>

        <Buttons>
          {isWrong ? (
            <RememberButton>
              <Button theme="primary" text="Запомнил" width={130} onPress={onNext} />
            </RememberButton>
          ) : (
            <>
              <Button theme="primary" text="Завершить" width={130} onPress={onFinished} />
              <Button theme="green" text="Ответить" width={130} onPress={onAnswer} />
            </>
          )}
        </Buttons>
      </Wrapper>
    </Container>
  );
};

const Container = styled.View`
  elevation: 4;
  border-radius: 18px;
  padding: 20px 15px 40px;
  background-color: ${Colors.white};
  overflow: hidden;
`;

const Wrapper = styled.View`
  border-radius: 18px;
`;

const Question = styled.Text`
  font-family: Museo;
  font-size: 24px;
  color: ${Colors.primary};
  text-align: center;
`;

const Field = styled.View`
  margin-top: 20px;
`;

const Actions = styled.View`
  min-height: 120px;
`;

const NotRememberButton = styled.View`
  margin-top: 20px;
  align-items: flex-end;
`;

const RememberButton = styled.View`
  width: 100%;
  align-items: center;
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
  font-family: Museo;
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
  padding-right: 50px;
  position: relative;
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
  top: -14px;
  left: 0;
  z-index: 1;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Count = styled.Text`
  font-family: Museo;
  font-size: 12px;
  z-index: 2;
  position: absolute;
  min-width: 50px;
  left: 30px;
  background-color: transparent;
  color: ${({ isWrong }) => (isWrong ? Colors.danger : Colors.green)};
`;
