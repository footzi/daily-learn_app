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
}) => {
  const currentTheme = themes[theme];
  return (
    <ThemeProvider theme={currentTheme}>
      <Modal
        isVisible={isOpenModal}
        swipeDirection="down"
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropColor={currentTheme.backdropColor}
        backdropOpacity={currentTheme.backdropOpacity}
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
};

const View = styled.View`
  background-color: ${({ theme }) => theme.backgroundColor};
  elevation: ${({ theme }) => theme.elevation};
  padding: 25px 15px 35px 15px;
  border-radius: 27px;
  width: 260px;
  min-height: 190px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.titleColor};
  font-family: Museo;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;
