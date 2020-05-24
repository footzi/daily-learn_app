import React from 'react';
import styled from 'styled-components/native';
import { Card, H3 } from 'native-base';

export const NotWords = () => {
  return (
    <Card>
      <CardWrapper>
        <H3 style={{ textAlign: 'center' }}>Упс :(</H3>
        <Field>В данном словаре нет слов. Добавьте слова на соответствующей вкладке.</Field>
      </CardWrapper>
    </Card>
  );
};

const CardWrapper = styled.View`
  padding: 20px;
`;

const Field = styled.Text`
  margin-top: 10px;
  text-align: center;
`;
