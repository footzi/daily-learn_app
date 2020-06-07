import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { Card, Item, Input, Button, Text, View, H3 } from 'native-base';
// import { Colors } from '@constants';
import { AskSlide } from './ask-slide';
import { ProgressBar } from '@components';
import { SETTINGS } from '@constants';
import { getNextIndex } from '../helpers';

import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Colors } from '@constants';

const zoomOut = {
  0: {
    opacity: 1,
    translateY: 0,
  },
  1: {
    opacity: 1,
    translateY: 300,
  },
};

const zoomIn = {
  0: {
    opacity: 1,
    translateY: 300,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};

const duration = 900;

export const CartWord = ({ words, profile, startIndex, onUpdateWords, onUpdatePaws, onFinished, navigation }) => {
  const [field, setField] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [nextIndex, setNextIndex] = useState(0);
  const [paws, setPaws] = useState(profile.paws);

  const pawRef = useRef(null);

  const currentWord = words[currentIndex];
  const nextWord = words[nextIndex];

  const currentRef = useRef();
  const nextRef = useRef();

  const onChange = (text) => setField(text);

  const onNotRemember = () => {
    setField('');
    setIsWrong(true);
  };

  const onAnimationEnd = () => {
    // console.log('anim end');
    // onUpdatePaws(1);
    // onUpdatePaws(1);

    setPaws(paws + 1);
  }

  const onAnswer = () => {
    const isRight = currentWord.answers.some((item) => item.toLowerCase() === field.toLowerCase().trim());

    if (isRight) {
      // onUpdateWords(currentWord);

      pawRef.current.animate(zoomIn, duration).then((p) => {

        setPaws(paws + 1);
        //onUpdatePaws(1);
      });

      onNext();


      setTimeout(() => {

      }, duration)
      // setTimeout(() => {
      //   onNext();
      // }, 300);
    } else {
      setIsWrong(true);
      onUpdatePaws(-1);
      pawRef.current.animate(zoomOut, duration);
    }

    setField('');
  };

  const onNext = () => {
    const nextIndex = getNextIndex(words, currentIndex);

    setIsWrong(false);

    if (nextIndex !== null) {
      setNextIndex(nextIndex);

      // currentRef.current.slideOutLeft(500);
      // nextRef.current.slideOutLeft(500);


      setCurrentIndex(nextIndex);
      setTimeout(() => {
      }, 500);
    } else {
      onFinished();
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Paw>
          <Animatable.View
            // animation={zoomIn}
            ref={pawRef}
            style={{ position: 'absolute', left: 0, zIndex: 1, flex: 1, flexDirection: 'row'}}
            easing="ease-in-out"
            useNativeDriver
            onAnimationEnd={onAnimationEnd}>

            <IconAnimate>
              <Icon name="md-paw" style={{ color: isWrong ? Colors.danger : Colors.success }} />
            </IconAnimate>
            <Count style={{ zIndex: 2, position: 'absolute', left: 20}}>+1</Count>
          </Animatable.View>


          <View style={{flex: 1, flexDirection: 'row', position: 'relative'}}>

            <Icon name="md-paw" style={{ zIndex: 2, color: Colors.success}} />
            <Count style={{ zIndex: 2, position: 'absolute', left: 20, minWidth: 50}}>{paws}</Count>
          </View>
        </Paw>
      ),
    });
  }, [navigation, paws, isWrong]);

  return (
    <Card>
      {/*<Slides>*/}
      {/*  <AskSlide animateRef={currentRef} word={currentWord} />*/}
      {/*  <AskSlide animateRef={nextRef} word={nextWord} />*/}
      {/*</Slides>*/}

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

const Slides = styled.View`
  padding-top: 20px;
  flex-direction: row;
`;

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

const Count = styled.Text`
  font-size: 16px;
  margin-left: 5px;
  background-color: white;
`;

const IconAnimate = styled.View`
  z-index: 1;
`;

const T = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  position: absolute;
`;
