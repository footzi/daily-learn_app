import React, {useEffect, useState} from 'react';
import { connect, useDispatch, useSelector  } from 'react-redux';
import styled from 'styled-components';
import CartWord from './organism/cart-word';
import Statistics from './organism/statistics';
import * as effects from '../effects';
import { createWords, getNext, getPrev } from './helpers';

const DictionaryTrainingScreen = ({ navigation }) => {
  const allDictionaries = useSelector(state => state.data.dictionaries);
  const dispatch = useDispatch();
  
  const selectedDictionaries = navigation.getParam('selectedDictionaries');
  const dictionaries = allDictionaries.filter(item => selectedDictionaries.includes(item.id));
  
  
  // const startIndex = words.findIndex(item => item.isShow);
  
  const words = createWords(dictionaries);
  const start = words.find((item) => item.isShow);
  
  console.log(start);
  
  const [word, setWord] = useState(start);
  const [count, setCount] = useState(word.count);
  // const startIndex = words.findIndex(item => item.isShow);
  // const [counter, setCounter] = useState(startIndex);
  const [isStatistics, setIsStatistics] = useState(false);

  
  const onNext = () => {
    // const target = getNext(words, counter);
  
    const body = {
      words_id: word.id,
      lang: word.lang
    };
    
    word.count = word.count + 1;
  
    setCount(word.count + 1);
    
    // const t = words.filter((item) => item.id_unique === word.)
    // word.count = word.count + 1;
    
    // console.log(updates);
  
    // setWords(updates);
  
    // dispatch(effects.changeCountWord({ body }));
 
    // console.log(words);
    
    // if (typeof target !== 'undefined') {
    //   setCounter(target);
    // } else {
    //   setIsStatistics(true);
    // }
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

  // const onSave = word => {
  //   const body = {
  //     words_id: word.id,
  //     lang: word.lang
  //   };
  //
  //   changeCountWord({ body });
  // };
  

  const onFinished = () => {
    setIsStatistics(true);
  };

  return (
    <Container>
      {/*{!isStatistics && startIndex === -1 && <NotWord>Вы выучили все слова</NotWord>}*/}
  
      {!isStatistics &&
        // words.map(
        //   (item, index) =>
        //     counter === index && <CartWord word={item} key={item.id_unique} onNext={onNext} onFinished={onFinished} />
        // )}
      <CartWord word={word} key={word.id_unique} onNext={onNext} count={word.count} onFinished={onFinished} />
      }
      
      {isStatistics && <Statistics words={words} />}
    </Container>
  );
};

DictionaryTrainingScreen.navigationOptions = () => ({
  title: 'Тренировка'
});

const Container = styled.View`
  padding: 10px;
`;

const NotWord = styled.Text``;

export default connect(
  null,
  null
)(DictionaryTrainingScreen);
