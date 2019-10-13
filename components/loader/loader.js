import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'native-base';

const Loader = () => {
  return (
    <Container>
      <Spinner color="blue" size={50}/>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding-left: 15px;
  padding-right: 15px;
`;

export default Loader;
