import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { SETTINGS } from '@constants';
import { CartWord } from './organism/cart-word';
import Statistics from './organism/statistics';
import * as effects from '../effects';
import { createWords, getNext } from './helpers';

export const DictionaryTrainingScreen = ({ route }) => {
  const allDictionaries = useSelector(state => state.data.dictionaries);
  const dispatch = useDispatch();

  const { selectedDictionaries } = route.params || [];
  const dictionaries = allDictionaries.filter(item => selectedDictionaries.includes(item.id));

  const [words, updateWords] = useState(createWords(dictionaries));

  const startWord = words.find(item => item.isShow) || null;
  const [word, setWord] = useState(startWord);
  const [isStatistics, setIsStatistics] = useState(false);

  const onRight = () => {
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
    setNext();
    dispatch(effects.saveCountWord(body));
  };

  const onWrong = () => setNext();

  const setNext = () => {
    const target = getNext(words, word);

    if (target) {
      setWord(target);
    } else {
      setIsStatistics(true);
    }
  };

  const onFinished = () => setIsStatistics(true);

  return (
    <Container>
      {!isStatistics && !word && <NotWord testID="not-word">Вы выучили все слова</NotWord>}

      {!isStatistics && word && <CartWord word={word} onRight={onRight} onWrong={onWrong} onFinished={onFinished} />}

      {isStatistics && <Statistics words={words} />}
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
`;

const NotWord = styled.Text``;
