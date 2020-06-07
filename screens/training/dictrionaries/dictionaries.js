import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { SETTINGS } from '@constants';
import { Loader } from '@components/loader';
import { Statistics, CartWord, Congratulation, NotWords } from './organism';
import { createWords, getStartIndex } from './helpers';
import * as effects from '../effects';
import { Button, Icon, Text } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../../constants';

export const DictionaryTrainingScreen = ({ route, navigation }) => {
  const { dictionaries: allDictionaries = [], profile = {} } = useSelector((state) => state);
  const { selectedDictionaries } = route.params || [];
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [startWordIndex, setStartWordIndex] = useState(0);
  const [isStatistics, setIsStatistics] = useState(false);

  const pawRef = useRef(null);

  const isNotWords = words.length === 0;
  const isAvailableWords = !isNotWords && startWordIndex !== null;

  const onUpdateWords = (word) => {
    const body = { id: word.id, type: word.type };
    const count = word.count + 1;

    const updatedWords = words.map((item) => {
      if (item.uid === word.uid) {
        item.count = count;
        item.isShow = count < SETTINGS.attempt;
      }
      return item;
    });

    setWords(updatedWords);
    dispatch(effects.saveCountWord(body));
  };

  const onUpdatePaws = (value) => {
    // setPaws(paws + value);
  };

  // const onFinished = () => setIsStatistics(true);
  const onFinished = () => {
    // pawRef.current.animate(zoomIn, 500);
    //pawRef.current.animate(zoomOut, 500);
  };

  useEffect(() => {
    const words = createWords(allDictionaries, selectedDictionaries);
    const startWordIndex = getStartIndex(words);

    setWords(words);
    setStartWordIndex(startWordIndex);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isNotWords) {
    return <NotWords />;
  }

  if (isStatistics) {
    return <Statistics />;
  }

  if (!isAvailableWords) {
    return <Congratulation />;
  }

  return (
    <Container>
      <CartWord
        words={words}
        startIndex={startWordIndex}
        profile={profile}
        onUpdateWords={onUpdateWords}
        onUpdatePaws={onUpdatePaws}
        onFinished={onFinished}
        navigation={navigation}
      />
    </Container>
  );
};

const Container = styled.View`
  z-index: -1;
`;
