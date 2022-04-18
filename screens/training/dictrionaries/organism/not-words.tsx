import { Title } from '@components';
import React from 'react';
import styled from 'styled-components/native';

export const NotWords: React.FC = () => {
  return (
    <CardWrapper>
      <Title>Упс :(</Title>
      <Field>В данном словаре нет слов. Добавьте слова на соответствующей вкладке.</Field>
    </CardWrapper>
  );
};

const CardWrapper = styled.View`
  padding: 20px;
`;

const Field = styled.Text`
  margin-top: 10px;
  text-align: center;
`;
