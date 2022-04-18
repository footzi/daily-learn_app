import { Title } from '@components';
import React from 'react';
import styled from 'styled-components/native';

export const Congratulation: React.FC = () => {
  return (
    <CardWrapper>
      <Title>Поздравляем!</Title>
      <Field>Вы выучили все слова</Field>
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
