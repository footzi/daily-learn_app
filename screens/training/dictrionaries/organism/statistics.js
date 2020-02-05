import React from 'react';
import styled from 'styled-components/native';
import { Card, H3 } from 'native-base';

const Statistics = ({ words }) => {
  return (
    <Card>
      <CardWrapper>
        <H3 style={{ textAlign: 'center' }}>Поздравляем!</H3>
        <Field>Здесь должна быть статистика</Field>
        {/* <Field>Знаешь перевод с русского на английский 2 из 5</Field>
        <Field>Знаешь перевод с английский на русский 2 из 5</Field> */}
      </CardWrapper>
    </Card>
  );
};

const CardWrapper = styled.View`
  padding: 20px;
`;

const Field = styled.Text`
  margin-top: 10px;
`;

export default Statistics;
