import React from 'react';
import styled from 'styled-components/native';
import { Card, H3 } from 'native-base';

export const Congratulation = () => {
  return (
    <Card>
      <CardWrapper>
        <H3 style={{ textAlign: 'center' }}>Поздравляем!</H3>
        <Field>Вы выучили все слова</Field>
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
