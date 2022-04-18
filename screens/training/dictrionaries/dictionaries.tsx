import { Loader } from '@components';
import { SETTINGS } from '@constants';
import { useFocusEffect } from '@react-navigation/native';
import { useAppContext } from '@store';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';

import { useSaveCountPaws } from './hooks/useSaveCountPaws';
import { useSaveCountWord } from './hooks/useSaveCountWord';
import { CreatedForTrainingWord, CreatedForTrainingWords, DictionaryTrainingScreenProps } from './interfaces';
import { CartWord, Congratulation, NotWords, Statistics } from './organism';
import { createWords, getStartIndex } from './utils';

export const DictionaryTrainingScreen: React.FC<DictionaryTrainingScreenProps> = ({ route, navigation }) => {
  const { state } = useAppContext();
  const { dictionaries: allDictionaries = [], user } = state;
  // @ts-ignore
  const { selectedDictionaries } = route.params || [];

  const { saveCountPaws } = useSaveCountPaws();
  const { saveCountWord } = useSaveCountWord();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [words, setWords] = useState<CreatedForTrainingWords>([]);
  const [paws, setPaws] = useState<number>(user?.paws);
  const [startWordIndex, setStartWordIndex] = useState<number>(0);
  const [isStatistics, setIsStatistics] = useState<boolean>(false);

  const isNotWords = words.length === 0;
  const isAvailableWords = !isNotWords && startWordIndex !== null;

  const onUpdateWords = (word: CreatedForTrainingWord) => {
    const count = word.count + 1;

    const updatedWords = words.map((item: CreatedForTrainingWord) => {
      if (item.uid === word.uid) {
        item.count = count;
        item.isShow = count < SETTINGS.attempt;
      }
      return item;
    });

    setWords(updatedWords);
    saveCountWord(word.id, word.type);
  };

  const onUpdatePaws = (value: number) => {
    const count = paws + value;
    setPaws(paws + value);
    saveCountPaws(count);
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
      return () => state.refetchMainData();
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
