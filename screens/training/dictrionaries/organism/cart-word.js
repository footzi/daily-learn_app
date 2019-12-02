import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Icon, Item, H3, Input, Button, Text } from 'native-base';
import { ProgressBar } from '@components/progress-bar';
import { SETTINGS } from '@constants/settings';

const CartWord = ({ word, onRight, onWrong, onFinished }) => {
  const [field, setField] = useState('');
  const [isNotRemember, setIsNotRemember] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const isCheck = word.answer.toLowerCase() === field.toLowerCase();

  const onChange = text => setField(text);
  const onNotRemember = () => setIsNotRemember(true);;
  const onAnswer = () => (isCheck ? onRight() : setIsWrong(true));
  const onRemember = () => onWrong();
  
  return (
    <Card>
      <CardWrapper>
        <H3 style={{ textAlign: 'center' }}>{word.question}</H3>
        <AskContainer>
          {!isNotRemember && !isWrong && (
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
                <ProgressBar progress={(word.count / SETTINGS.attempt) * 100} />
              </ProgressWrapper>
              <NotRemember>
                <Button danger transparent onPress={onNotRemember}>
                  <Text>Не помню :(</Text>
                </Button>
              </NotRemember>
            </Ask>
          )}
          {(isNotRemember || isWrong) && <RightAnswer isWrong={isWrong}>{word.answer}</RightAnswer>}
        </AskContainer>
        <Actions>
          {!isNotRemember && !isWrong && (
            <>
              <Button warning onPress={onFinished} style={{ width: 120 }}>
                <Text style={{ flex: 1, textAlign: 'center' }}>Завершить</Text>
              </Button>
              <Button success={!!field} disabled={!field} onPress={onAnswer} style={{ width: 120 }}>
                <Text style={{ flex: 1, textAlign: 'center' }}>Ответить</Text>
              </Button>
            </>
          )}

          {isNotRemember && !isWrong && (
            <Button success onPress={onRemember} style={{ flex: 1 }}>
              <Text style={{ flex: 1, textAlign: 'center' }}>Запомнил</Text>
            </Button>
          )}

          {isWrong && (
            <>
              <Button warning onPress={onFinished} style={{ width: 120 }}>
                <Text style={{ flex: 1, textAlign: 'center' }}>Завершить</Text>
              </Button>
              <Button success onPress={onWrong} style={{ width: 120 }}>
                <Text style={{ flex: 1, textAlign: 'center' }}>Далее</Text>
              </Button>
            </>
          )}
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
  height: 130px;
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
  margin-top: 50px;
  color: ${(p) => p.isWrong ? 'red' : 'black'}
`;

export default CartWord;
