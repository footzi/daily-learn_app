import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Card, Item, H3, Input, Button, Text } from 'native-base';
import { ProgressBar } from '@components';
import { SETTINGS } from '@constants';

export const CartWord = ({ word, onRight, onWrong, onFinished }) => {
  const [field, setField] = useState('');
  const [isNotRemember, setIsNotRemember] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const onChange = text => setField(text);
  const onNotRemember = () => setIsNotRemember(true);

  const onAnswer = () => {
    const isCheck = word.answers.some(item => item.toLowerCase() === field.toLowerCase());

    if (isCheck) {
      setField('');
      onRight();
    } else {
      setIsWrong(true);
    }
  };

  const onRemember = () => {
    setIsNotRemember(false);
    setField('');
    onWrong();
  };

  const onWrongNext = () => {
    setIsWrong(false);
    setField('');
    onWrong();
  };

  return (
    <Card testID="cart-word">
      <CardWrapper>
        <H3 style={{ textAlign: 'center' }}>{word.question}</H3>
        <AskContainer>
          {!isNotRemember && !isWrong && (
            <Ask>
              <Answer>
                <Item>
                  <Input
                    placeholder={word.type === 'translate' ? 'English please' : 'Ответь на русском'}
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
          {(isNotRemember || isWrong) && (
            <RightAnswer>
              {word.answers.map((item, index) => (
                <ItemAnswer key={index} isWrong={isWrong}>
                  {item}
                </ItemAnswer>
              ))}
            </RightAnswer>
          )}
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
              <Button success onPress={onWrongNext} style={{ width: 120 }}>
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

const RightAnswer = styled.View`
  flex: 1;
  justify-content: center;
`;

const ItemAnswer = styled.Text`
  font-size: 22px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  color: ${p => (p.isWrong ? 'red' : 'black')};
`;
