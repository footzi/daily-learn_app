import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { SETTINGS } from '@constants';
import { Loader } from '@components/loader';
import { Statistics, CartWord, Congratulation, NotWords } from './organism';
import { createWords, getNextIndex, getStartIndex, getStartWord, getNextWord } from './helpers';
import * as effects from '../effects';

export const DictionaryTrainingScreen = ({ route }) => {
  const { data = {} } = useSelector((state) => state);
  const allDictionaries = data.dictionaries;
  const { selectedDictionaries } = route.params || [];
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [words, setWords] = useState([]);

  const [currentWord, setCurrentWord] = useState({});
  const [nextWord, setNextWord] = useState({});

  // const [startWordIndex, setStartWordIndex] = useState(0);
  const [isStatistics, setIsStatistics] = useState(false);

  const isNotWords = words.length === 0;
  // const isAvailableWords = !isNotWords && startWordIndex !== null;

  const onUpdateCurrentWord = () => {
    const count = currentWord.count + 1;

    setCurrentWord({ ...currentWord, count });
  };

  const onUpdateWords = () => {
    const body = { id: currentWord.id, type: currentWord.type };
    const count = currentWord.count + 1;

    const updatedWords = words.map((item) => {
      if (item.uid === currentWord.uid) {
        item.count = count;
        item.isShow = count < SETTINGS.attempt;
      }
      return item;
    });

    setWords(updatedWords);
    dispatch(effects.saveCountWord(body));

    // const body = { id: word.id, type: word.type };
    // const count = word.count + 1;
    //
    // const updatedWords = words.map((item) => {
    //   if (item.uid === word.uid) {
    //     item.count = count;
    //     item.isShow = count < SETTINGS.attempt;
    //   }
    //   return item;
    // });
    //
    // setWords(updatedWords);
    // dispatch(effects.saveCountWord(body));
  };

  const onChangeCurrentWord = () => {
    const nextWord = getNextWord(words, currentWord);

    setCurrentWord(nextWord);
  };

  const onFinished = () => setIsStatistics(true);

  useEffect(() => {
    const words = createWords(allDictionaries, selectedDictionaries);

    const currentWord = getStartWord(words); // {} || null
    //const nextWord = getNextWord(words, currentWord);

    setWords(words);
    setCurrentWord(currentWord);

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  // if (isNotWords) {
  //   return <NotWords />;
  // }
  //
  // if (isStatistics) {
  //   return <Statistics />;
  // }

  // if (!isAvailableWords) {
  //   return <Congratulation />;
  // }

  return (
    <Container>
      <CartWord
        words={words}
        curentWord={currentWord}
        nexWord={nextWord}
        startIndex={null}
        onUpdateWords={onUpdateWords}
        onChangeCurrentWord={onChangeCurrentWord}
        onFinished={onFinished}
        onUpdateCurrentWord={onUpdateCurrentWord}
      />
    </Container>
  );
};

const Container = styled.View``;
