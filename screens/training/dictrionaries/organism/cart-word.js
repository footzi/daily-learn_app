import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Card, Item, Input, Button, Text } from 'native-base';
import { Colors } from '@constants';
import { AskSlide } from './ask-slide';
import { getNextIndex } from '../helpers';

export const CartWord = ({ words, startIndex, curentWord, nexWord, onUpdateWords, onFinished, onChangeCurrentWord, onUpdateCurrentWord }) => {

  // console.log(curentWord);
  // console.log(nexWord);


  const [prevWord, setPrevWord] = useState(curentWord);

  const [field, setField] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(startIndex);
  // const [nextIndex, setNextIndex] = useState(0);
  // const [currentWord, setCurrentWord] = useState(words[startIndex]);
  // const [nextWord, setNextWord] = useState(words[0]);

  // const currentWord = words[currentIndex];
  // const nextWord = words[nextIndex];


  const prevWordRef = useRef();
  const currentRef = useRef();
  const nextRef = useRef();

  const onChange = (text) => setField(text);

  const onNotRemember = () => {
    setField('');
    setIsWrong(true);
  };

  const onNext = () => {
    setPrevWord(curentWord);
    onChangeCurrentWord();
    prevWordRef.current.slideOutLeft(500);
    currentRef.current.slideOutLeft(500);
    setIsWrong(false);
  }

  const onAnswer = () => {
    const isRight = curentWord.answers.some((item) => item.toLowerCase() === field.toLowerCase().trim());

    if (isRight) {
      // onUpdateWords();

      onUpdateCurrentWord();


      setTimeout(() => {
        onNext();
        onUpdateWords();
      }, 300)
    } else {
      setIsWrong(true);
    }

    setField('');

    // const isRight = currentWord.answers.some((item) => item.toLowerCase() === field.toLowerCase().trim());
    //
    // if (isRight) {
    //   onUpdateWords(currentWord);
    //
    //   setTimeout(() => {
    //     onNext();
    //   }, 300);
    // } else {
    //   setIsWrong(true);
    // }
    //
    // setField('');
  };

  // const onTransitionEnd = () => {
  //   console.log('nhfyc tcn');
  // }

  const onNext2 = () => {
    // const nextIndex = getNextIndex(words, currentIndex);
    //
    // if (nextIndex !== null) {
    //   setNextIndex(nextIndex);
    //
    //   currentRef.current.slideOutLeft(500);
    //   nextRef.current.slideOutLeft(500);
    //
    //   setTimeout(() => {
    //     setCurrentIndex(nextIndex);
    //   }, 500);
    // } else {
    //   onFinished();
    // }
    //
    // setIsWrong(false);
  };

  // console.log(curentWord, 'curentWord in cart');
  // console.log(nexWord, 'nexWord in cart');

  const onEndAnim = () => {


    // onUpdateWords();
  }


  return (
    <Card>
      <Slides>
        <AskSlide animateRef={prevWordRef} word={prevWord} />
        <AskSlide animateRef={currentRef} word={curentWord} />
      </Slides>

      <Content>
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
              {curentWord.answers.map((item, index) => (
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
            <Button success onPress={onN} style={{ flex: 1 }}>
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

const Content = styled.View`
  padding-left: 20px;
  padding-right: 20px;
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
  padding-bottom: 20px;
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
