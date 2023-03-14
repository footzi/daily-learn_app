import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { NewColors as Colors } from '@/constants';

export const CenterModal = ({ isOpenModal, closeModal, title, isInverse, children }) => (
  <Modal
    isVisible={isOpenModal}
    animationIn="slideInRight"
    animationOut="slideOutRight"
    swipeDirection="right"
    onSwipeComplete={closeModal}
    onBackdropPress={closeModal}
    style={{ justifyContent: 'center', marginLeft: 48, marginRight: 48 }}
    useNativeDriver={true}
    propagateSwipe={true}
    backdropColor={isInverse ? Colors.black : Colors.white}>
    <View isInverse={isInverse}>
      {title && <Title>{title}</Title>}
      {children}
    </View>
  </Modal>
);

const View = styled.View`
  background-color: ${({ isInverse }) => (isInverse ? Colors.white : Colors.secondary)};
  padding: 36px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  elevation: 5;
`;

const Title = styled.Text`
  color: ${Colors.white};
  font-family: RobotoBold;
  font-size: 16px;
  margin-bottom: 20px;
`;
