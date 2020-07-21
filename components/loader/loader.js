import React from 'react';
import styled from 'styled-components/native';
import { NewColors as Colors } from '@constants';
import { Spinner } from '../Spinner';

export const Loader = () => (
  <Container>
    <Spinner color={Colors.primary} size={50} />
  </Container>
);

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding-left: 15px;
  padding-right: 15px;
`;
