import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

export const BottomModal = ({ isOpenModal = false, closeModal = () => {}, title = '', children }) => (
  <Modal
    isVisible={isOpenModal}
    swipeDirection="down"
    onSwipeComplete={closeModal}
    onBackdropPress={closeModal}
    style={{ justifyContent: 'flex-end', margin: 0 }}
    useNativeDriver={true}
    propagateSwipe={true}>
    <View>
      <Title>{title}</Title>
      {children}
    </View>
  </Modal>
);

const View = styled.View`
  background-color: white;
  padding: 22px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-color: white;
`;

const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`;

// return (
//   <Modal.BottomModal
//     visible={isOpenModal}
//     width={1}
//     onTouchOutside={closeModal}
//     onSwipeOut={closeModal}
//     modalTitle={<ModalTitle title={title} />}
//     modalAnimation={
//       new SlideAnimation({
//         initialValue: 0,
//         slideFrom: 'bottom',
//         useNativeDriver: true
//       })
//     }>
//     <ModalContent>{children}</ModalContent>
//   </Modal.BottomModal>
// );
