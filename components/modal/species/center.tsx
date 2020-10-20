import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import Modal from 'react-native-modal';
import { ModalProps } from '../interfaces';
import { themes } from '../themes';

export const CenterModal: React.FC<ModalProps> = ({
  theme = 'primary',
  isOpenModal = false,
  closeModal,
  title,
  children,
}) => (
  <ThemeProvider theme={themes[theme]}>
    <Modal
      isVisible={isOpenModal}
      swipeDirection="down"
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.4}
      onSwipeComplete={closeModal}
      onBackdropPress={closeModal}
      style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
      useNativeDriver={true}
      propagateSwipe={true}>
      <View>
        {title && <Title>{title}</Title>}
        {children}
      </View>
    </Modal>
  </ThemeProvider>
);

const View = styled.View`
  background-color: ${({ theme }) => theme.backgroundColor};
  elevation: ${({ theme }) => theme.elevation};
  padding: 20px 15px 30px 15px;
  border-radius: 27px;
  width: 260px;
  min-height: 160px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.titleColor};
  font-family: Museo;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;
