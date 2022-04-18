import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import { ModalProps } from '../interfaces';

export const HeaderModal: React.FC<ModalProps> = ({ isOpenModal = false, closeModal, children }) => (
  <Modal
    isVisible={isOpenModal}
    swipeDirection="right"
    onSwipeComplete={closeModal}
    onBackdropPress={closeModal}
    backdropColor="transparent"
    animationIn="slideInRight"
    animationOut="slideOutRight"
    useNativeDriver={true}>
    <View>{children}</View>
  </Modal>
);

const View = styled.View`
  position: absolute;
  top: 0;
  margin-top: 30px;
  right: -18px;
  width: 250px;
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 10px 5px 5px black;
  z-index: 1;
`;
