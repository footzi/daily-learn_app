import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CartWord from './molecules/cart-word';
import Statistics from './molecules/statistics';
import * as effects from '../effects';
import { createWords, getNext, getPrev } from './utils';

const mapStateToProps = state => ({
  dictionaries: state.data.dictionaries
});

const mapDispatchToProps = {
  changeCountWord: effects.changeCountWord
};

const DictionaryTrainingScreen = ({ navigation, dictionaries, changeCountWord }) => {
  const id = navigation.getParam('selectDictionary').id;
  const dictionary = dictionaries.find(item => item.id === id);
  const words = createWords(dictionary.words);
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

  const onPrev = () => {
    const target = getPrev(words, counter);

    if (typeof target !== 'undefined') {
      setCounter(target);
    } else {
      setIsStatistics(true);
    }
  };

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
                onPrev={onPrev}
                onNext={onNext}
                onSave={onSave}
                onFinished={onFinished}
              />
            )
        )}
      {isStatistics && <Statistics words={words} />}
    </Container>
  );
};

DictionaryTrainingScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('selectDictionary').name
});

const Container = styled.View`
  padding: 10px;
`;

const NotWord = styled.Text``;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DictionaryTrainingScreen);
