import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Icon, Item, H3, Input, Button, Text } from 'native-base';
import ProgressBar from '../../../../components/progress-bar';
import Settings from '../../../../constants/Settings';

const CartWord = ({ word, onPrev, onNext, onSave, onFinished }) => {
  const [isRight, setIsRight] = useState('');
  const [field, setField] = useState('');
  const isCheck = word.answer.toLowerCase() === field.toLowerCase();

  const onChange = text => {
    setField(text);
  };

  const onPaw = () => {
    if (isCheck) {
      onNext();
      onSave(word);
    } else {
      setIsRight(isCheck);
    }
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
        <Answer>
          <Item success={!!isRight && isRight !== ''} error={!isRight && isRight !== ''}>
            <Input
              placeholder={word.lang === 'en' ? 'Ответь на русском' : 'English please'}
              onChangeText={onChange}
              value={field}
              autoFocus={true}
            />

            {!!isRight && isRight !== '' && <Icon name="checkmark-circle" />}
            {!isRight && isRight !== '' && <Icon name="close-circle" />}
          </Item>
        </Answer>
        <ProgressWrapper>
          <ProgressBar progress={(word.count / Settings.attempt) * 100} />
        </ProgressWrapper>
        <Actions>
          <Button info transparent onPress={onPrev}>
            <Icon name="md-arrow-round-back" style={{ fontSize: 40 }} />
          </Button>
          <Button success transparent onPress={onPaw}>
            <Icon name="paw" style={{ fontSize: 40 }} />
          </Button>
          <Button info transparent onPress={onNext}>
            <Icon name="md-arrow-round-forward" style={{ fontSize: 40 }} />
          </Button>
        </Actions>
        <Finsihed>
          <Button info>
            <Text style={{ textAlign: 'center', flex: 1 }} onPress={onFinished}>
              Завершить
            </Text>
          </Button>
        </Finsihed>
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

const Actions = styled.View`
  flex-direction: row;
  margin-top: 30px;
  justify-content: space-between;
`;

const ProgressWrapper = styled.View`
  margin-top: 20px;
`;

const Finsihed = styled.View`
  margin-top: 40px;
`;

export default CartWord;
