import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CartWord from './organism/cart-word';
import Statistics from './organism/statistics';
import * as effects from '../effects';
import { createWords, getNext, getPrev } from './helpers';

const mapStateToProps = state => ({
  allDictionaries: state.data.dictionaries
});

const mapDispatchToProps = {
  changeCountWord: effects.changeCountWord
};

const DictionaryTrainingScreen = ({ navigation, allDictionaries, changeCountWord }) => {
  const selectedDictionaries = navigation.getParam('selectedDictionaries');
  const dictionaries = allDictionaries.filter(item => selectedDictionaries.includes(item.id));
  
  const words = createWords(dictionaries);
  const startIndex = words.findIndex(item => item.isShow);

  const [counter, setCounter] = useState(startIndex);
  const [isStatistics, setIsStatistics] = useState(false);

  const onNext = () => {
    const target = getNext(words, counter);

    if (typeof target !== 'undefined') {
      setCounter(target);
    } else {
      setIsStatistics(true);
    }
  };

  // const onPrev = () => {
  //   const target = getPrev(words, counter);
  //
  //   if (typeof target !== 'undefined') {
  //     setCounter(target);
  //   } else {
  //     setIsStatistics(true);
  //   }
  // };

  const onSave = word => {
    const body = {
      words_id: word.id,
      lang: word.lang
    };

    changeCountWord({ navigation, body });
  };

  const onFinished = () => {
    setIsStatistics(true);
  };

  return (
    <Container>
      {!isStatistics && startIndex === -1 && <NotWord>Вы выучили все слова</NotWord>}
      
      {!isStatistics &&
        words.map(
          (item, index) =>
            counter === index && (
              <CartWord
                word={item}
                key={item.id_unique}
                onNext={onNext}
                onFinished={onFinished}
              />
            )
        )}
      {isStatistics && <Statistics words={words} />}
    </Container>
  );
};

DictionaryTrainingScreen.navigationOptions = ({ navigation }) => ({
  title: 'Тренировка'
});

const Container = styled.View`
  padding: 10px;
`;

const NotWord = styled.Text``;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DictionaryTrainingScreen);
