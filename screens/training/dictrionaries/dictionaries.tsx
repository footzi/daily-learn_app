import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { SETTINGS } from '@constants';
import { Loader } from '@components';
import { Statistics, CartWord, Congratulation, NotWords } from './organism';
import { createWords, getStartIndex } from './utils';
import { updateData } from '@store';
import * as effects from './effects';

export const DictionaryTrainingScreen = ({ route = {}, navigation = {} }) => {
  const { dictionaries: allDictionaries = [], profile = {} } = useSelector((state) => state);
  const { selectedDictionaries } = route.params || [];
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [words, setWords] = useState([]);
  const [paws, setPaws] = useState(profile.paws);
  const [startWordIndex, setStartWordIndex] = useState<number>(0);
  const [isStatistics, setIsStatistics] = useState<boolean>(false);

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
    const count = paws + value;
    setPaws(paws + value);
    dispatch(effects.saveCountPaws(count));
  };

  const onFinished = () => setIsStatistics(true);

  useEffect(() => {
    const words = createWords(allDictionaries, selectedDictionaries);
    const startWordIndex = getStartIndex(words);

    setWords(words);
    setStartWordIndex(startWordIndex);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(updateData());
    }, [])
  );

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
        paws={paws}
        navigation={navigation}
        onUpdateWords={onUpdateWords}
        onUpdatePaws={onUpdatePaws}
        onFinished={onFinished}
      />
    </Container>
  );
};

const Container = styled.View`
  z-index: -1;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
`;
