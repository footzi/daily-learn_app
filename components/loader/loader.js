import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { Spinner } from 'native-base';

export const Loader = ({ opacity = 0 }) => {
  return (
    <Modal isVisible={true} backdropOpacity={opacity}>
      <Container>
        <Spinner color="blue" size={50} />
      </Container>
    </Modal>
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
