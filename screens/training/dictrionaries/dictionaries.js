import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { SETTINGS } from '@constants';
import { CartWord } from './organism/cart-word';
import Statistics from './organism/statistics';
import { createWords, getStartIndex } from './helpers';
import * as effects from '../effects';

export const DictionaryTrainingScreen = ({ route }) => {
  const allDictionaries = useSelector(state => state.data.dictionaries);
  const dispatch = useDispatch();

  const { selectedDictionaries } = route.params || [];
  const dictionaries = allDictionaries.filter(item => selectedDictionaries.includes(item.id));

  const [words, updateWords] = useState(createWords(dictionaries));
  const startWordIndex = getStartIndex(words);
  const [isStatistics, setIsStatistics] = useState(false);
  const isAvailableWords = startWordIndex !== null;

  const onUpdateWords = word => {
    const body = { id: word.id, type: word.type };
    const count = word.count + 1;

    const updatedWords = words.map(item => {
      if (item.uid === word.uid) {
        item.count = count;
        item.isShow = count < SETTINGS.attempt;
      }
      return item;
    });

    updateWords(updatedWords);
    dispatch(effects.saveCountWord(body));
  };

  const onFinished = () => setIsStatistics(true);

  return (
    <Container>
      {isStatistics && <Statistics />}

      {!isStatistics && isAvailableWords && (
        <CartWord words={words} startIndex={startWordIndex} onFinished={onFinished} onUpdateWords={onUpdateWords} />
      )}

      {!isStatistics && !isAvailableWords && <NotWord testID="not-word">Вы выучили все слова</NotWord>}
    </Container>
  );
};

const Container = styled.View``;
const NotWord = styled.Text``;
