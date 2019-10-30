import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Icon, Item, H3, Input, Button, Text } from 'native-base';
import ProgressBar from '../../../../components/progress-bar';
import Settings from '../../../../constants/Settings';

const CartWord = ({ word, onNext, onFinished }) => {
  const [isRight, setIsRight] = useState('');
  
  
  const [isNotRemember, setIsNotRemember] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [field, setField] = useState('');
  const isCheck = word.answer.toLowerCase() === field.toLowerCase();

  const onChange = text => {
    setField(text);
  };

  // const onPaw = () => {
  //   if (isCheck) {
  //     // onNext();
  //     // onSave(word);
  //   } else {
  //     setIsRight(isCheck);
  //   }
  // };
  
  const onAnswer = () => {
    if (isCheck) {
      onNext();
      //     // onSave(word);
    }
    console.log(isCheck);
  };

  useEffect(() => {
    if (isRight !== '') {
      setIsRight(isCheck);
    }
  }, [field]);

  return (
    <Card>
      <CardWrapper>
        <H3 style={{ textAlign: 'center' }}>{word.question}</H3>
        <AskContainer>
          {isNotRemember && (
            <Ask>
              <Answer>
                <Item>
                  <Input
                    placeholder={word.lang === 'en' ? 'Ответь на русском' : 'English please'}
                    onChangeText={onChange}
                    value={field}
                    autoFocus={true}
                  />
                </Item>
              </Answer>
              <ProgressWrapper>
                <ProgressBar progress={(word.count / Settings.attempt) * 100} />
              </ProgressWrapper>
              <NotRemember>
                <Button danger transparent>
                  <Text>Не помню :(</Text>
                </Button>
              </NotRemember>
            </Ask>
          )}
          <RightAnswer>
            {word.answer}
          </RightAnswer>
          
          
        </AskContainer>
        <Actions>
          <Button warning onPress={onFinished} style={{width: 120}}>
            <Text style={{flex: 1, textAlign: 'center'}}>Завершить</Text>
          </Button>
          <Button success onPress={onAnswer} style={{width: 120}}>
            <Text style={{flex: 1, textAlign: 'center'}}>Ответить</Text>
          </Button>
        </Actions>
      </CardWrapper>
    </Card>
  );
};

const CardWrapper = styled.View`
  padding: 20px;
`;

const Answer = styled.View`
  margin-top: 10px;
`;

const AskContainer = styled.View`
  height: 100px;
`;

const Ask = styled.View``;

const ProgressWrapper = styled.View`
  margin-top: 20px;
`;

const NotRemember = styled.View`
  margin-top: 15px;
  flex-direction: row;
  justify-content: flex-end;
`;

const Actions = styled.View`
  flex-direction: row;
  margin-top: 30px;
  justify-content: space-between;
`;

const RightAnswer = styled.Text`
  font-size: 22px;
  font-weight: 500;
  text-transform: uppercase;
  flex: 1;
  text-align: center;
  margin-top: 40px;
`;

export default CartWord;
